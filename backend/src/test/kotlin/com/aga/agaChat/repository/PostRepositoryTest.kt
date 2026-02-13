package com.aga.agaChat.repository

import com.aga.agaChat.models.dto.PostDto
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class PostRepositoryTest {
    @Test
    fun `should return all posts when null query`() {
        // given
        val repository: PostRepository = InMemoryPostRepository()
        repository.createPost(1, null)
        repository.createPost(2,null)
        repository.createPost(3,null)

        // when
        val result = repository.filterPosts(null)

        // then
        assertEquals(3, result.size)
    }

    @Test
    fun `should return one post when query = testQuery`() {
        // given
        val repository: PostRepository = InMemoryPostRepository()
        repository.createPost(1, null)
        repository.createPost(2,"testQuery")
        repository.createPost(3,null)

        // when
        val result = repository.filterPosts("testQuery")

        // then
        assertEquals(1, result.size)
    }

    @Test
    fun `should add new post`() {
        // given
        val repository: PostRepository = InMemoryPostRepository()
        val dto = PostDto(
            id = 1,
            title = "title",
            content = "body",
        )

        // when
        repository.createPost(dto)

        // then
        val createdPosts = repository.filterPosts(null)
        assertEquals(1, createdPosts.size)
        assertEquals(dto.id, createdPosts[0].id)
        assertEquals(dto.title, createdPosts[0].title)
    }

    @Test
    fun `should remove post`() {
        // given
            val repository: PostRepository = InMemoryPostRepository()
            repository.createPost(1, null)

        // when
            repository.removePost(1)

        // then
            assertEquals(emptyList<PostDto>(), repository.filterPosts(null))
    }

    @Test
    fun `should update post`() {
        // given
        val repository: PostRepository = InMemoryPostRepository()
        repository.createPost(1, null)
        val dto = PostDto(
            id = 1,
            title = "updatedTitle",
            content = "updatedContent",
        )

        // when
        val updatedPost = repository.updatePost(dto)

        // then
        assertEquals(dto, updatedPost)
    }

    private fun PostRepository.createPost(id: Long, content: String?) {
        val dto = PostDto(
            id = id,
            title = "title",
            content = if (content != null) "$content\n" else "content",
        )
        this.createPost(dto)

    }

}