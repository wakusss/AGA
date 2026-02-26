package com.aga.agaChat.controllers

import com.aga.agaChat.models.dto.*
import com.aga.agaChat.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

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

    @GetMapping("/me")
    fun loadMyPosts(
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
    ): ResponseEntity<PostDto> {
        val newPost = postService.createPost(dto)
        return ResponseEntity
            .created(URI.create("/api/posts/${newPost.id}"))
            .body(newPost)
    }

    @PostMapping("/{id}/like")
    fun toggleLikePost(
        @PathVariable("id") id: Long
    ): LikeToggledDto {
        return postService.toggleLikePost(id)
    }

    // @Patch
    @PatchMapping
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