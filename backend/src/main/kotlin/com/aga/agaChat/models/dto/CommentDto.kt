package com.aga.agaChat.models.dto

import java.util.Date

class CommentDto(
    val id: Long? = null,
    val author: CommentUserDto,
    val content: String,
    val created_at: Date = Date(),
)

class CreateCommentDto(
    val content: String,
)

data class PagedComments(
    val content: List<CommentDto>,
    val page: Int,
    val size: Int,
    val totalElements: Int,
    val totalPages: Int,
    val last: Boolean
)