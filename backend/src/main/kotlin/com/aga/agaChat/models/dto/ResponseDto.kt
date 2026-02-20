package com.aga.agaChat.models.dto

data class ErrorResponse(
    val status: Int,
    val message: String,
    val details: Map<String, String>? = null,
)