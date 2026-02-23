package com.aga.agaChat.models.dto

data class AuthorDto(
    val id: Long,
    val username: String,
    val avatarUrl: String,
)

data class PostDto (
    val id:Long,
    val content:String,
    val imageUrl:String,
    val author:AuthorDto,
    val createdAt:String,
    val likesCount:Int,
    val commentsCount:Int,
    val isLikedByCurrentUser:Boolean,
)

data class PagedPosts(
    val content: List<PostDto>,
    val page: Int,
    val size: Int,
    val totalElements: Long,
    val totalPages: Int,
    val last: Boolean
)