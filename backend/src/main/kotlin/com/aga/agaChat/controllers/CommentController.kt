package com.aga.agaChat.controllers


import com.aga.agaChat.models.dto.CommentDto
import com.aga.agaChat.models.dto.CreateCommentDto
import com.aga.agaChat.models.dto.PagedComments
import com.aga.agaChat.service.CommentService
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/posts")
class CommentController(
    val commentService: CommentService
) {

    @GetMapping("/{id}/comments")
    fun getComments(
        @PathVariable("id") id: Long,
        @RequestParam("page", required = false) page: Int = 0,
        @RequestParam("size", required = false) size: Int = 20,
    ): PagedComments?
    {
        return commentService.getComments(id, page, size)
    }

    @PostMapping("/{id}/comments")
    fun createComment(
        @PathVariable("id") id: Long,
        @RequestBody dto: CreateCommentDto,
    ): CommentDto {
        return commentService.createComment(id, dto)
    }
}