package com.aga.agaChat.models.dto

import java.util.Date

data class UserDto(
    val id: Long,
    val email: String,
    val username: String,
    val bio: String,
    val avatarUrl: String,
    val createdAt: Date = Date(),
)

data class UpdateUserDto(
    var username: String? = null,
    var avatarUrl: String? = null,
    var bio: String? = null,
)