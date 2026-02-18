package com.aga.agaChat.service

import com.aga.agaChat.models.dto.PostDto
import com.aga.agaChat.repository.PostRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

interface PostService {
    fun filterPosts(query: String?): List<PostDto>
    fun createPost(dto: PostDto): PostDto
    fun updatePost(dto: PostDto): PostDto
    fun removePost(id: Long): ResponseEntity<*>
}

@Service
class PostServiceImpl(
    private val postRepository: PostRepository
): PostService {

    override fun filterPosts(query: String?): List<PostDto> {
        return postRepository.filterPosts(query)
    }

    override fun createPost(dto: PostDto): PostDto {
        return postRepository.createPost(dto)
    }

    override fun updatePost(dto: PostDto): PostDto {
        return postRepository.updatePost(dto)
    }

    override fun removePost(id: Long): ResponseEntity<*> {
        return postRepository.removePost(id)
    }

}