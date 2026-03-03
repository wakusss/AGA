package com.aga.agaChat.repository

import com.aga.agaChat.models.entity.Post
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.models.entity.UserPostLike
import org.springframework.data.jpa.repository.JpaRepository

interface LikeRepository : JpaRepository<UserPostLike, Long> {
    fun findByUserIdAndPostId(userId: Long, postId: Long): UserPostLike?
    fun existsByUserIdAndPostId(userId: Long, postId: Long): Boolean
    fun countByPostAndLikedTrue(post: Post): Long
    fun findByUserAndPost(user: User, post: Post): UserPostLike?
    fun deleteByPostId(postId: Long?)

}