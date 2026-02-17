package com.aga.agaChat.controllers

import com.aga.agaChat.models.dto.PostDto
import com.aga.agaChat.repository.PostRepository
import org.springframework.http.ResponseEntity
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
    private val postRepository: PostRepository,
){
    val posts = mutableListOf<PostDto>()

    @GetMapping
    fun loadPosts(
        @RequestParam("q", required = false) query: String?,
    ): List<PostDto>  {
        return postRepository.filterPosts(query)
    }

    @PostMapping
    fun createPost(
        @RequestBody dto: PostDto
    ): PostDto {
        return postRepository.createPost(dto)
    }

    @PutMapping
    fun updatePost(
        @RequestBody dto: PostDto
    ): PostDto {
        return postRepository.updatePost(dto)
    }

    @DeleteMapping("/{id}")
    fun deletePost(
        @PathVariable("id") id: Long
    ): ResponseEntity<*> {
        return postRepository.removePost(id)
    }
}