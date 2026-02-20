package com.aga.agaChat.service

import com.aga.agaChat.models.dto.LoginRequest
import com.aga.agaChat.models.dto.RegisterRequest
import com.aga.agaChat.models.entity.Role
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.repository.UserRepository
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.crypto.password.PasswordEncoder

class AuthServiceTest {

    // Моки зависимостей
    private val userRepository: UserRepository = mockk()
    private val passwordEncoder: PasswordEncoder = mockk()
    private val jwtService: JwtService = mockk()

    // Тестируемый сервис
    private val authService = AuthService(
        userRepository = userRepository,
        passwordEncoder = passwordEncoder,
        jwtService = jwtService
    )

    @Test
    fun `register should succeed when email is free`() {
        // given
        val request = RegisterRequest(
            email = "newuser@example.com",
            password = "strongpass123"
        )

        val hashedPassword = "hashed_strongpass123"
        val savedUser = User(
            id = 100L,
            email = request.email,
            password = hashedPassword,
            role = Role.USER
        )

        // Настраиваем моки
        every { userRepository.existsByEmail(request.email) } returns false
        every { passwordEncoder.encode(request.password) } returns hashedPassword
        every { userRepository.save(any()) } returns savedUser
        every { jwtService.generateToken(any()) } returns "jwt.token.value"

        // when
        val result = authService.register(request)

        // then
        assertEquals("jwt.token.value", result.token)
        assertEquals(100L, result.userId)
        assertEquals("newuser@example.com", result.email)

        // Проверяем вызовы зависимостей
        verify(exactly = 1) { userRepository.existsByEmail(request.email) }
        verify(exactly = 1) { passwordEncoder.encode(request.password) }
        verify(exactly = 1) { userRepository.save(match { it.email == request.email && it.role == Role.USER }) }
        verify(exactly = 1) { jwtService.generateToken(savedUser) }
    }

    @Test
    fun `register should throw exception when email already exists`() {
        // given
        val request = RegisterRequest(
            email = "existing@example.com",
            password = "pass123"
        )

        every { userRepository.existsByEmail(request.email) } returns true

        // when & then
        val exception = assertThrows<BadCredentialsException> {
            authService.register(request)
        }

        assertEquals("User with Email ${request.email} already exists", exception.message)

        // Проверяем, что save НЕ был вызван
        verify(exactly = 0) { userRepository.save(any()) }
        verify(exactly = 0) { jwtService.generateToken(any()) }
    }

    @Test
    fun `login should succeed with correct credentials`() {
        // given
        val request = LoginRequest(
            email = "user@example.com",
            password = "correctpass"
        )

        val user = User(
            id = 42L,
            email = request.email,
            password = "hashed_correctpass",
            role = Role.USER
        )

        every { userRepository.findByEmail(request.email) } returns user
        every { passwordEncoder.matches(request.password, user.password) } returns true
        every { jwtService.generateToken(user) } returns "jwt.token.here"

        // when
        val result = authService.login(request)

        // then
        assertEquals("jwt.token.here", result.token)
        assertEquals(42L, result.userId)
        assertEquals("user@example.com", result.email)

        verify(exactly = 1) { userRepository.findByEmail(request.email) }
        verify(exactly = 1) { passwordEncoder.matches(request.password, user.password) }
        verify(exactly = 1) { jwtService.generateToken(user) }
    }

    @Test
    fun `login should throw exception when email not found`() {
        // given
        val request = LoginRequest(
            email = "unknown@example.com",
            password = "pass"
        )

        every { userRepository.findByEmail(request.email) } returns null

        // when & then
        val exception = assertThrows<BadCredentialsException> {
            authService.login(request)
        }

        assertEquals("Incorrect email or password", exception.message)

        verify(exactly = 1) { userRepository.findByEmail(request.email) }
        verify(exactly = 0) { passwordEncoder.matches(any(), any()) }
        verify(exactly = 0) { jwtService.generateToken(any()) }
    }

    @Test
    fun `login should throw exception when password is wrong`() {
        // given
        val request = LoginRequest(
            email = "user@example.com",
            password = "wrongpass"
        )

        val user = User(
            id = 42L,
            email = request.email,
            password = "hashed_correctpass",
            role = Role.USER
        )

        every { userRepository.findByEmail(request.email) } returns user
        every { passwordEncoder.matches(request.password, user.password) } returns false

        // when & then
        val exception = assertThrows<BadCredentialsException> {
            authService.login(request)
        }

        assertEquals("Incorrect email or password", exception.message)

        verify(exactly = 1) { userRepository.findByEmail(request.email) }
        verify(exactly = 1) { passwordEncoder.matches(request.password, user.password) }
        verify(exactly = 0) { jwtService.generateToken(any()) }
    }
}