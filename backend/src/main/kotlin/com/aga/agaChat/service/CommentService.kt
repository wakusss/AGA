package com.aga.agaChat.service

import com.aga.agaChat.models.dto.CommentDto
import com.aga.agaChat.models.dto.CommentUserDto
import com.aga.agaChat.models.dto.CreateCommentDto
import com.aga.agaChat.models.dto.PagedComments
import com.aga.agaChat.models.entity.Comment
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.repository.CommentRepository
import com.aga.agaChat.repository.PostRepository
import com.aga.agaChat.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import kotlin.collections.emptyList

interface CommentService{
     fun getComments(postId: Long, page: Int, size: Int): PagedComments
     fun createComment(postId: Long, dto: CreateCommentDto): CommentDto
 }

@Service
class CommentServiceImpl(
    val commentRepository: CommentRepository,
    val postRepository: PostRepository,
    val userRepository: UserRepository,
): CommentService {

    override fun getComments(
        postId: Long,
        page: Int,
        size: Int
    ): PagedComments {
        val comments = commentRepository.findAllByPostId(postId)

        val total = comments.size
        val totalPages = if (size <= 0) 1 else (total + size - 1) / size
        val from = page * size
        val to = minOf(from + size, total)

        val content = if (from >= total) emptyList() else comments.subList(from, to)

        val commentDtos = content.map { comment ->
            comment.toDto()
        }

        return PagedComments(
            content = commentDtos,
            page = page,
            size = size,
            totalElements = total,
            totalPages = totalPages,
            last = (page >= totalPages - 1) || content.isEmpty(),
        )
    }

    override fun createComment(
        postId: Long,
        dto: CreateCommentDto
    ): CommentDto {
        val post = postRepository.findById(postId)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND) }

        val savedComment = commentRepository.save(
            Comment(
                user = getCurrentUser(),
                post = post,
                content = dto.content,
            )
        )

        return savedComment.toDto()
    }




    private fun Comment.toDto(): CommentDto = CommentDto(
        id = this.id,
        author = CommentUserDto(
            this.user.id!!,
            this.user.username ?: "",
            this.user.avatarUrl ?: ""
            ),
        content = this.content ?: "",
        created_at = this.createdAt,
    )

    private fun getCurrentUser(): User {
        val auth = SecurityContextHolder.getContext().authentication
        if (auth == null || !auth.isAuthenticated) throw ResponseStatusException(HttpStatus.UNAUTHORIZED)
        val email = auth.name
        val user = userRepository.findByEmail(email) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User with email ${email} not found")
        return user
    }

}



