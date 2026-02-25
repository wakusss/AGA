package com.aga.agaChat.models.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.ForeignKey
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.util.Date

@Entity
@Table(name = "Posts")
data class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        nullable = false,
        foreignKey = ForeignKey(
            name = "fk_post_user_id"
        )
    )
    val user: User,

    @Column(nullable = true)
    var imageUrl: String? = null,

    @Column(nullable = true)
    var content: String? = null,

    @Column(nullable = true)
    var likesCount: Long = 0,

    @Column(nullable = true)
    var commentsCount: Long = 0,

    @Column(nullable = false)
    val createdAt: Date = Date(),

)