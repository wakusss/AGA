package com.aga.agaChat.repository



import com.aga.agaChat.models.dto.PostDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Repository
import org.springframework.web.server.ResponseStatusException


interface PostRepository {
    fun createPost(dto: PostDto): PostDto
    fun filterPosts(query: String?): List<PostDto>
    fun removePost(id: Long): ResponseEntity<*>
    fun updatePost(dto: PostDto): PostDto
}

@Repository
class InMemoryPostRepository : PostRepository {
    val posts = mutableListOf<PostDto>(
        PostDto(id = 1, title = "Первый пост", content = "Привет, мир!"),
        PostDto(id = 2, title = "Kotlin крут", content = "Почему все переходят на Kotlin?"),
        PostDto(id = 3, title = "Spring Boot 4", content = "Что нового в 2025–2026")
    )

    override fun createPost(dto: PostDto): PostDto {
        posts.add(dto)
        return dto
    }

    override fun filterPosts(query: String?): List<PostDto> {
        return if(query != null){
            posts.filter{
                it.content.contains(query, ignoreCase = true)
            }
        } else posts
    }

    override fun removePost(id: Long): ResponseEntity<*> {
        val postToDelete = posts.find { it.id == id }
        return if (postToDelete != null) {
            posts.remove(postToDelete)
            ResponseEntity.ok().build<Any>()
        }
        else
            ResponseEntity.notFound().build<Any>()
    }

    override fun updatePost(dto: PostDto): PostDto {
        val index = posts.indexOfFirst { it.id == dto.id }
        if (index != -1) {
            posts[index] = dto
            return dto
        }
        else{
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }
    }
}

