package com.aga.agaChat.models.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(unique = true, nullable = false)
    val email: String,

    @Column(nullable = false)
    val password: String?,

    @Column(nullable = true)
    var username: String? = null,

    @Column(nullable = true)
    var bio: String? = null,

    @Column(nullable = true)
    var avatarUrl: String? = null,

    @Enumerated(EnumType.STRING)
    val role: Role = Role.USER,

    @Column(nullable = false)
    val createdAt: Date = Date(),
)

enum class Role { USER, ADMIN }
