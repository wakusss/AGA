package com.aga.agaChat.service

import com.aga.agaChat.models.dto.*
import com.aga.agaChat.models.entity.Post
import com.aga.agaChat.models.entity.Role
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.models.entity.UserPostLike
import com.aga.agaChat.repository.LikeRepository
import com.aga.agaChat.repository.PostRepository
import com.aga.agaChat.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

interface PostService {
    fun getPosts(query: String?, page: Int, size: Int, sortBy: String, sortDirection: String): PagedPosts
    fun getPostById(id: Long): PostDto
    fun createPost(dto: CreatePostDto): PostDto
    fun toggleLikePost(id: Long): LikeToggledDto
    fun updatePost(dto: UpdatePostDto): PostDto
    fun removePost(id: Long): ResponseEntity<*>

}

@Service
class PostServiceImpl(
    private val postRepository: PostRepository,
    private val userRepository: UserRepository,
    private val likeRepository: LikeRepository,


    // Delete in production
    private val passwordEncoder: PasswordEncoder
): PostService {

    init {
        addTestPosts()
    }

    override fun getPosts(
        query: String?,
        page: Int,
        size: Int,
        sortBy: String,
        sortDirection: String
    ): PagedPosts {
        var posts = postRepository.findAll()


        // 1. Filter by query
        if (!query.isNullOrBlank()) {
            val q = query.trim()
            posts = posts.filter { post ->
                post.content?.contains(q, ignoreCase = true) == true
            }
        }

        // 2. Filter by `sortBy` (by default createdAt desc)
        val comparator: Comparator<Post> = when (sortBy.lowercase()) {
            "likes"    -> compareByDescending(Post::likesCount)
            "comments" -> compareByDescending(Post::commentsCount)
            else       -> compareByDescending(Post::createdAt)
        }

        // sort direction - asc/desc
        val sortComp = if (sortDirection.lowercase() == "asc") {
            comparator.reversed()
        } else {
            comparator
        }

        val sorted = posts.sortedWith(sortComp)

        // 3. Pagination
        val total = sorted.size
        val totalPages = if (size <= 0) 1 else (total + size - 1) / size
        val from = page * size
        val to = minOf(from + size, total)

        val content = if (from >= total) emptyList() else sorted.subList(from, to)

        val currentUserId = getCurrentUserId()

        val postDtos = posts.map { post ->
            post.toDto(currentUserId)
        }

        return PagedPosts(
            content = postDtos,
            page = page,
            size = size,
            totalElements = total.toLong(),
            totalPages = totalPages,
            last = (page >= totalPages - 1) || content.isEmpty()
        )

    }

    override fun getPostById(id: Long): PostDto {
        val post = postRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND) }

        val currentUserId = getCurrentUserId()

        return post.toDto(currentUserId)
        }


    @Transactional
    override fun createPost(dto: CreatePostDto): PostDto {
        val newPost = postRepository.save(dto.toPost(getCurrentUser()))
        return newPost.toDto(getCurrentUser().id)
    }
    @Transactional
    override fun toggleLikePost(id: Long): LikeToggledDto {
        val post = postRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Post with id $id not found") }
        val user = getCurrentUser()

        val existingLike = likeRepository.findByUserAndPost(user, post)

        val newLikedState: Boolean

        if (existingLike != null) {
            existingLike.liked = !existingLike.liked
            likeRepository.save(existingLike)
            newLikedState = existingLike.liked
        } else {
            val newLike = UserPostLike(
                user = user,
                post = post,
                liked = true
            )
            likeRepository.save(newLike)
            newLikedState = true
        }

        val likesCount = likeRepository.countByPostAndLikedTrue(post)
        post.likesCount = likesCount

        return LikeToggledDto(
            liked = newLikedState,
            likesCount = likesCount
        )
    }

    @Transactional
    override fun updatePost(dto: UpdatePostDto): PostDto {
        val postToUpdate = postRepository.findById(dto.id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Post with id ${dto.id} not found") }
        val author = postToUpdate.user
        val currentUser = getCurrentUser()

        if(author == currentUser) {
            postRepository.save(dto.toPost(currentUser))
            return postToUpdate.toDto(getCurrentUser().id)
        }
        else
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
    }

    @Transactional
    override fun removePost(id: Long): ResponseEntity<*> {
        val postToDelete = postRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Post with id ${id} not found") }
        val author = postToDelete.user
        val currentUser = getCurrentUser()
        return if (postToDelete != null ) {
            if(author == currentUser){
                postRepository.deleteById(id)
                ResponseEntity.noContent().build<Any>()
            }
            else
                ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        }
        else
            ResponseEntity.notFound().build<Any>()
    }


    private fun getCurrentUserId(): Long? {
        val auth = SecurityContextHolder.getContext().authentication
        if (auth == null || !auth.isAuthenticated) return null

        val email = auth.name

        return userRepository.findByEmail(email)?.id
    }

    private fun getCurrentUser(): User {
        val auth = SecurityContextHolder.getContext().authentication
        if (auth == null || !auth.isAuthenticated) throw ResponseStatusException(HttpStatus.UNAUTHORIZED)
        val email = auth.name
        val user = userRepository.findByEmail(email) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User with email ${email} not found")
        return user
    }

    private fun isLikedByUser(userId: Long, postId: Long): Boolean {
        return likeRepository.findByUserIdAndPostId(userId, postId)?.liked == true
    }



    private fun Post.toDto(
        currentUserId: Long? = null,
    ): PostDto = PostDto(
        id = this.id!!,
        content = this.content ?: "",
        imageUrl = this.imageUrl ?: "",
        author = AuthorDto(
            id        = this.user.id!!,
            username  = this.user.username ?: "",
            avatarUrl = this.user.avatarUrl ?: ""
        ),
        createdAt = this.createdAt,
        likesCount = this.likesCount,
        commentsCount = this.commentsCount,
        isLikedByCurrentUser = currentUserId != null &&
                isLikedByUser(currentUserId, this.id!!)
    )

    private fun CreatePostDto.toPost(currentUser: User): Post = Post(
        user            = currentUser,
        imageUrl        = this.imageUrl,
        content         = this.content,
    )
    private fun UpdatePostDto.toPost(currentUser: User): Post = Post(
        id              = this.id,
        user            = currentUser,
        imageUrl        = this.imageUrl,
        content         = this.content,
    )


    fun addTestPosts() {
        val user = User(
            // id = null,
            username = "Glebs Sinkevich",
            email = "glebsinks@gmail.com",
            password = passwordEncoder.encode("glebsinks@gmail.com"),
            bio = "Developer",
            avatarUrl = "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
            role = Role.USER
        )

        val savedUser = userRepository.save(user)

        val firstPost = Post(
            user = savedUser,
            content = "Good morning! Today is a perfect day for coffee and coding ☕💻 #Kotlin #SpringBoot",
            imageUrl = "https://www.wishgoodmorning.com/wp-content/uploads/2017/04/Wishing-You-A-Day-Full-Of-Joyfull-Moments..jpg",
            likesCount = 18,
            commentsCount = 4
        )
        val secondPost = Post(
            user = savedUser,
            content = "Has anyone tried the new features in Spring Boot 3.4? Share your impressions! 🚀",
            likesCount = 7,
            commentsCount = 12
        )

        val thirdPost = Post(
            user = savedUser,
            content = "AGA Chat update 1.2: now you can send voice messages and reactions! 🔥 Who's already tried it?",
            imageUrl = "https://play-lh.googleusercontent.com/CAu_Njn4xHjGXg_i5i-H0K-PF2PiKHwvpgNiESjjP7iBBPGfX8kE8cd9SPap0AA96Zg",
            likesCount = 342,
            commentsCount = 98
        )
        postRepository.saveAll(listOf(firstPost,secondPost,thirdPost))

    }
}




