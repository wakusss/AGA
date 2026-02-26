package com.aga.agaChat.repository

import com.aga.agaChat.models.entity.Comment
import org.springframework.data.jpa.repository.JpaRepository

interface CommentRepository: JpaRepository<Comment, Long> {
    fun findAllByPostId(postId: Long): List<Comment>
}