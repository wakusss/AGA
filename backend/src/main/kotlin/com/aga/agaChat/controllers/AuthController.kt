package com.aga.agaChat.controllers

import com.aga.agaChat.models.dto.AuthResponse
import com.aga.agaChat.models.dto.LoginRequest
import com.aga.agaChat.models.dto.RegisterRequest
import com.aga.agaChat.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {
    /**
     * Register new user
     *
     * @return 201 Created + token on success
     * @throws 400 Bad Request on invalid data
     * @throws 409 Conflict on email already exists
     */
    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<AuthResponse> {
        return try {
            val response = authService.register(request)
            ResponseEntity(response, HttpStatus.CREATED)
        } catch (e: BadCredentialsException) {
            // email already exists
            ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(AuthResponse(
                    token = "",
                    userId = null,
                    email = request.email,
                    message = e.message
                ))
        } catch (e: Exception) {
            ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(AuthResponse(
                    token = "",
                    userId = null,
                    email = request.email,
                    message = e.message
                ))
        }
    }

    /**
     * User login
     *
     * @return 200 OK + token on success
     * @throws 401 Unauthorized on invalid data
     */
    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        return try {
            val response = authService.login(request)
            ResponseEntity.ok(response)
        } catch (e: BadCredentialsException) {
            ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(AuthResponse(
                    token = "",
                    userId = null,
                    email = request.email,
                    message = e.message
                ))
        } catch (e: Exception) {
            ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(AuthResponse(
                    token = "",
                    userId = null,
                    email = request.email,
                    message = e.message
                ))
        }
    }
}