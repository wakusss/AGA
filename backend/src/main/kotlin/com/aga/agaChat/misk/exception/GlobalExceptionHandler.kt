package com.aga.agaChat.misk.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.server.ResponseStatusException
import java.time.Instant

data class ErrorResponse(
    val status: Int,
    val error: String,
    val message: String?,
    val timestamp: Instant = Instant.now(),
    val path: String? = null
)

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException::class)
    fun handleResponseStatusException(
        ex: ResponseStatusException,
    ): ResponseEntity<ErrorResponse> {

        val status = ex.statusCode

        val errorText = when (ex.statusCode.value()) {
            400 -> "Bad Request"
            401 -> "Unauthorized"
            403 -> "Forbidden"
            404 -> "Not Found"
            500 -> "Internal Server Error"
            else -> ex.statusCode.toString()
        }

        val response = ErrorResponse(
            status = status.value(),
            error = errorText,
            message = ex.reason ?: ex.message,
        )

        return ResponseEntity(response, status)
    }


    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = 500,
            error = "Internal Server Error",
            message = "Internal Server Error"
        )
        return ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}