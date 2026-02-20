package com.aga.agaChat.models.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.Date

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(unique = true, nullable = false)
    val email: String,

    @Column(nullable = false)
    val password: String?,           // хранится захэшированный BCrypt

    @Column(nullable = true)
    val username: String? = null,

    @Column(nullable = true)
    val bio: String? = null,

    @Column(nullable = true)
    val avatarUrl: String? = null,

    @Enumerated(EnumType.STRING)
    val role: Role = Role.USER,

    @Column(nullable = false)
    val createdAt: Date = Date(),
)

enum class Role { USER, ADMIN }
