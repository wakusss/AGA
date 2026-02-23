package com.aga.agaChat.service

import com.aga.agaChat.models.dto.PagedPosts
import com.aga.agaChat.models.dto.PostDto
import com.aga.agaChat.repository.PostRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

interface PostService {
    fun getPosts(query: String?, page: Int, size: Int, sortBy: String?, sortDirection: String?): PagedPosts
    fun getPostById(id: Long): PostDto
    fun createPost(dto: PostDto): PostDto
    fun updatePost(dto: PostDto): PostDto
    fun removePost(id: Long): ResponseEntity<*>

}

@Service
class PostServiceImpl(
    private val postRepository: PostRepository
): PostService {



    override fun getPosts(
        query: String?,
        page: Int,
        size: Int,
        sortBy: String?,
        sortDirection: String?
    ): PagedPosts {
        return postRepository.getPosts(query= query, page= page, size= size, sortBy= sortBy, sortDirection= sortDirection)
    }

    override fun getPostById(id: Long): PostDto {
        return postRepository.getPostById(id)
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

