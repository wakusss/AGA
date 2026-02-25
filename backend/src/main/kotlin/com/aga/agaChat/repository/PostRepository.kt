package com.aga.agaChat.repository

import com.aga.agaChat.models.dto.AuthorDto
import com.aga.agaChat.models.dto.PagedPosts
import com.aga.agaChat.models.dto.PostDto
import com.aga.agaChat.models.entity.Post
import com.aga.agaChat.models.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Repository
import org.springframework.web.server.ResponseStatusException


interface PostRepository : JpaRepository<Post, Long> {

}


