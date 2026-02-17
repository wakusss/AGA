package com.aga.agaChat.service

import com.aga.agaChat.models.dto.AuthResponse
import com.aga.agaChat.models.dto.LoginRequest
import com.aga.agaChat.models.dto.RegisterRequest
import com.aga.agaChat.models.entity.Role
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {

    /**
     * Register new user
     * @throws BadCredentialsException on email already exists
     */
    @Transactional
    fun register(req: RegisterRequest): AuthResponse {
        // 1. Check, if user with this email already exists
        if (userRepository.existsByEmail(req.email)) {
            throw BadCredentialsException("User with Email ${req.email} already exists")
        }

        // 2. Hash password
        val hashedPassword = passwordEncoder.encode(req.password)

        // 3. Create User Entity
        val user = User(
            email = req.email,
            password = hashedPassword,
            role = Role.USER   // user as a default
        )

        // 4. Save into db
        val savedUser = userRepository.save(user)

        // 5. Generate JWT-token
        val token = jwtService.generateToken(savedUser)

        // 6. Create response
        return AuthResponse(
            token = token,
            userId = savedUser.id,
            email = savedUser.email,
            message = "OK"
        )
    }

    /**
     * User login function
     * @throws BadCredentialsException on incorrect email or password
     */
    fun login(req: LoginRequest): AuthResponse {
        // 1. Find user by email
        val user = userRepository.findByEmail(req.email)
            ?: throw BadCredentialsException("Incorrect email or password")

        // 2. Check password
        if (!passwordEncoder.matches(req.password, user.password)) {
            throw BadCredentialsException("Incorrect email or password")
        }

        // 3. Generate JWT-token
        val token = jwtService.generateToken(user)

        // 4. Build response
        return AuthResponse(
            token = token,
            userId = user.id,
            email = user.email
        )
    }
}