package com.aga.agaChat.repository

import com.aga.agaChat.models.entity.Post
import com.aga.agaChat.models.entity.User
import org.springframework.data.jpa.repository.JpaRepository


interface PostRepository : JpaRepository<Post, Long> {
    fun findByUser(user: User) : List<Post>
}


