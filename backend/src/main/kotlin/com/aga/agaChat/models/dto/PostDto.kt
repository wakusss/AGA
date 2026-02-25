package com.aga.agaChat.models.dto

import java.util.Date

data class AuthorDto(
    val id: Long,
    val username: String,
    val avatarUrl: String,
)

data class PostDto (
    val id: Long,
    val content: String,
    val imageUrl: String,
    val author: AuthorDto,
    val createdAt: Date? = Date(),
    val likesCount: Long,
    val commentsCount: Long,
    val isLikedByCurrentUser: Boolean,
)

data class CreatePostDto(
    val content:String,
    val imageUrl:String
)

data class UpdatePostDto(
    val id:Long,
    val content:String,
    val imageUrl:String,

)

data class PagedPosts(
    val content: List<PostDto>,
    val page: Int,
    val size: Int,
    val totalElements: Long,
    val totalPages: Int,
    val last: Boolean
)