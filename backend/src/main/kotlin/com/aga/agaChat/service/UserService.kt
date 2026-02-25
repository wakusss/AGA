package com.aga.agaChat.service

import com.aga.agaChat.models.dto.UpdateUserDto
import com.aga.agaChat.models.dto.UserDto
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

interface UserService {
    fun getMe(): UserDto
    fun updateMe(user: UpdateUserDto): UserDto
    fun getUser(id: Long): UserDto

}

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,

): UserService {


    override fun getMe(): UserDto {
        return getCurrentUser().toDto()
    }

    override fun updateMe(user: UpdateUserDto): UserDto {
        val currentUser = getCurrentUser()
        currentUser.bio = user.bio
        currentUser.username = user.username
        currentUser.avatarUrl = user.avatarUrl

        val updatedUser = userRepository.save(currentUser)

        return updatedUser.toDto()
    }

    override fun getUser(id: Long): UserDto {
        return userRepository.findById(id).get().toDto()
    }

    private fun getCurrentUser(): User {
        val auth = SecurityContextHolder.getContext().authentication
        if (auth == null || !auth.isAuthenticated) throw ResponseStatusException(HttpStatus.UNAUTHORIZED)
        val email = auth.name
        val user = userRepository.findByEmail(email) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User with email ${email} not found")
        return user
    }

    private fun User.toDto(): UserDto {
        return UserDto(
            id = this.id ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User with id ${this.id} not found"),
            email = this.email,
            username = this.username ?: "",
            bio = this.bio ?: "",
            avatarUrl = this.avatarUrl ?: "",
            createdAt = this.createdAt,
        )
    }
}




