package com.aga.agaChat.controllers

import com.aga.agaChat.models.dto.CreatePostDto
import com.aga.agaChat.models.dto.PagedPosts
import com.aga.agaChat.models.dto.PostDto
import com.aga.agaChat.models.dto.UpdatePostDto
import com.aga.agaChat.service.PostService
import org.hibernate.query.SortDirection
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/posts")
class PostController (
    private val postService: PostService,

){
    // @Get
    @GetMapping
    fun loadPosts(
        @RequestParam("query", required = false) query: String?,
        @RequestParam("page", required = false) page: Int = 0,
        @RequestParam("size", required = false) size: Int = 20,
        @RequestParam("sortBy", required = false) sortBy: String = "createdAt",
        @RequestParam("sortDirection", required = false) sortDirection: String = "asc",
    ): PagedPosts {
        return postService.getPosts(query, page, size, sortBy, sortDirection)
    }

    @GetMapping("/{id}")
    fun getPostById(
        @PathVariable("id") id: Long
    ): PostDto  {
        return postService.getPostById(id)
    }

    // @Post
    @PostMapping
    fun createPost(
        @RequestBody dto: CreatePostDto,
    ): PostDto {
        return postService.createPost(dto)
    }

    // @Put
    @PutMapping
    fun updatePost(
        @RequestBody dto: UpdatePostDto
    ): PostDto {
        return postService.updatePost(dto)
    }

    // @Delete
    @DeleteMapping("/{id}")
    fun deletePost(
        @PathVariable("id") id: Long
    ): ResponseEntity<*> {
        return postService.removePost(id)
    }
}