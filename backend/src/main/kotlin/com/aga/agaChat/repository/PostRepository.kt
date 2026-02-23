package com.aga.agaChat.repository

import com.aga.agaChat.models.dto.AuthorDto
import com.aga.agaChat.models.dto.PagedPosts
import com.aga.agaChat.models.dto.PostDto
import com.aga.agaChat.models.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Repository
import org.springframework.web.server.ResponseStatusException


interface PostRepository {
    fun createPost(dto: PostDto): PostDto
    fun getPosts(query: String?, page: Int, size: Int, sortBy: String?, sortDirection: String?): PagedPosts
    fun getPostById(id: Long): PostDto
    fun removePost(id: Long): ResponseEntity<*>
    fun updatePost(dto: PostDto): PostDto
}



@Repository
class InMemoryPostRepository : PostRepository {
    val posts = mutableListOf<PostDto>()

    init {
        addTestPosts(posts)
    }

    override fun createPost(dto: PostDto): PostDto {
        posts.add(dto)
        return dto
    }

    override fun getPosts(
        query: String?,
        page: Int,
        size: Int,
        sortBy: String?,
        sortDirection: String?
    ): PagedPosts {

        // 1. Filter by query
        var filtered = posts
        if (!query.isNullOrBlank()) {
            filtered = posts.filter {
                it.content.contains(query, ignoreCase = true)
            }.toMutableList()
        }

        // 2. Filter by `sortBy` (by default createdAt desc)
        val comparator = when (sortBy?.lowercase()) {
            "likes" -> compareByDescending<PostDto> { it.likesCount }
            "comments" -> compareByDescending { it.commentsCount }
            else -> compareByDescending { it.createdAt } // default — createdAt
        }

        // sort direction - asc/desc
        if (sortDirection?.lowercase() == "asc") {
            filtered.sortWith(comparator.reversed())
        } else {
            filtered.sortWith(comparator)
        }

        // 3. Pagination
        val totalElements = filtered.size.toLong()
        val totalPages = if (size > 0) ((totalElements + size - 1) / size).toInt() else 1
        val start = page * size
        val end = minOf(start + size, filtered.size)

        val pageContent = if (start >= filtered.size) {
            emptyList()
        } else {
            filtered.subList(start, end)
        }

        val isLast = page >= totalPages - 1 || pageContent.isEmpty()

        return PagedPosts(
            content = pageContent,
            page = page,
            size = size,
            totalElements = totalElements,
            totalPages = totalPages,
            last = isLast
        )
    }

    override fun getPostById(id: Long): PostDto {
        return posts.find{it.id == id}?:throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    override fun removePost(id: Long): ResponseEntity<*> {
        val postToDelete = posts.find { it.id == id }
        return if (postToDelete != null) {
            posts.remove(postToDelete)
            ResponseEntity.ok().build<Any>()
        }
        else
            ResponseEntity.notFound().build<Any>()
    }

    override fun updatePost(dto: PostDto): PostDto {
        val index = posts.indexOfFirst { it.id == dto.id }
        if (index != -1) {
            posts[index] = dto
            return dto
        }
        else{
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }
    }
}

fun addTestPosts(posts: MutableList<PostDto>) {
    posts.addAll(
        listOf(
            PostDto(
                id = 1,
                content = "Good morning! Today is a perfect day for coffee and coding ☕💻 #Kotlin #SpringBoot",
                imageUrl = "https://www.wishgoodmorning.com/wp-content/uploads/2017/04/Wishing-You-A-Day-Full-Of-Joyfull-Moments..jpg",
                author = AuthorDto(
                    id = 42,
                    username = "glebs",
                    avatarUrl = "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                ),
                createdAt = "2025-02-20T08:15:30Z",
                likesCount = 18,
                commentsCount = 4,
                isLikedByCurrentUser = true
            ),
            PostDto(
                id = 47,
                content = "Has anyone tried the new features in Spring Boot 3.4? Share your impressions! 🚀",
                imageUrl = "",
                author = AuthorDto(
                    id = 15,
                    username = "dev_guru",
                    avatarUrl = "https://lh6.googleusercontent.com/proxy/ZLGihPRfkkerdJBqfRKKFRWQcXDCfMMuuK_6_IDH6Mfhu0VI3Du2L9eOTiz0yKsIftOesQQnj0whQCZFudjFH-cXgBKnebrpknuWtjKkDcRC5Ik"
                ),
                createdAt = "2025-02-19T14:45:12Z",
                likesCount = 7,
                commentsCount = 12,
                isLikedByCurrentUser = false
            ),
            PostDto(
                id = 128,
                content = "AGA Chat update 1.2: now you can send voice messages and reactions! 🔥 Who's already tried it?",
                imageUrl = "https://play-lh.googleusercontent.com/CAu_Njn4xHjGXg_i5i-H0K-PF2PiKHwvpgNiESjjP7iBBPGfX8kE8cd9SPap0AA96Zg",
                author = AuthorDto(
                    id = 1,
                    username = "admin_aga",
                    avatarUrl = ""
                ),
                createdAt = "2025-02-18T19:30:00Z",
                likesCount = 342,
                commentsCount = 89,
                isLikedByCurrentUser = true
            ),
            PostDto(
                id = 203,
                content = "Just deployed my first Kotlin Multiplatform mobile app — sharing code between Android and iOS feels like magic ✨ Anyone else on the KMP train?",
                imageUrl = "",
                author = AuthorDto(
                    id = 88,
                    username = "multiplatform_dev",
                    avatarUrl = "https://cdn-icons-png.flaticon.com/512/5968/5968703.png"
                ),
                createdAt = "2025-02-22T10:20:00Z",
                likesCount = 41,
                commentsCount = 9,
                isLikedByCurrentUser = false
            ),
            PostDto(
                id = 219,
                content = "Weekend project: built a tiny URL shortener with Spring Boot + Redis in under 2 hours. Repo is open — PRs welcome! 🔗 #Java #Redis",
                imageUrl = "https://miro.medium.com/v2/resize:fit:1400/1*5-aoK8IBmXve5whBQM90GA.png",
                author = AuthorDto(
                    id = 7,
                    username = "weekend_coder",
                    avatarUrl = ""
                ),
                createdAt = "2025-02-23T13:10:45Z",
                likesCount = 96,
                commentsCount = 23,
                isLikedByCurrentUser = true
            )
        )
    )
}


