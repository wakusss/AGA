package com.aga.agaChat.controllers

import com.aga.agaChat.models.dto.ErrorResponse
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
     */
    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<Any> {
        return try {
            val response = authService.register(request)
            ResponseEntity(response, HttpStatus.CREATED)
        } catch (e: BadCredentialsException) {
            // email already exists
            ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                    ErrorResponse(
                        status = 409,
                        message = e.message ?: "Email already exists",
                    )
                )
        } catch (e: Exception) {
            ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse(
                    status = 500,
                    message = e.message ?: "Internal server error"
                ))
        }
    }

    /**
     * User login function
     */
    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<Any> {
        return try {
            val response = authService.login(request)
            ResponseEntity.ok(response)
        } catch (e: BadCredentialsException) {
            ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse(
                    status = 401,
                    message = e.message ?: "Invalid credentials",
                ))
        } catch (e: Exception) {
            ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse(
                    status = 500,
                    message = e.message ?: "Internal server error"
                ))
        }
    }
}