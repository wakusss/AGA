package com.aga.agaChat.misk.initData

//import com.aga.agaChat.models.entity.Role
//import com.aga.agaChat.models.entity.User


import com.aga.agaChat.models.entity.Post
import com.aga.agaChat.models.entity.Role
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.repository.PostRepository
import com.aga.agaChat.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class TestDataInitializer(
    private val userRepository: UserRepository,
    private val postRepository: PostRepository,
    private val passwordEncoder: PasswordEncoder
) : CommandLineRunner {

    @Transactional
    override fun run(args: Array<String>) {
        val testEmail = "user@gmail.com"

        var user = userRepository.findByEmail(testEmail)

        if (user == null) {
            user = User(
                username = "Test user",
                email = testEmail,
                password = passwordEncoder.encode("user@gmail.com"),  // ← нормальный тестовый пароль
                bio = "Developer",
                avatarUrl = "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
                role = Role.USER
            )
            user = userRepository.save(user)
            println("Created new user: $testEmail")
        } else {
            println("Test user already exists, skipping creation...")
        }

        if (postRepository.findByUser(user).isEmpty()) {
            val posts = listOf(
                Post(
                    user = user,
                    content = "Good morning! Today is a perfect day for coffee and coding ☕💻 #Kotlin #SpringBoot",
                    imageUrl = "https://www.wishgoodmorning.com/wp-content/uploads/2017/04/Wishing-You-A-Day-Full-Of-Joyfull-Moments.jpg",
                    likesCount = 18,
                    commentsCount = 4
                ),
                Post(
                    user = user,
                    content = "Has anyone tried the new features in Spring Boot 3.4? Share your impressions! 🚀",
                    likesCount = 7,
                    commentsCount = 12
                ),
                Post(
                    user = user,
                    content = "AGA Chat update 1.2: now you can send voice messages and reactions! 🔥 Who's already tried it?",
                    imageUrl = "https://play-lh.googleusercontent.com/CAu_Njn4xHjGXg_i5i-H0K-PF2PiKHwvpgNiESjjP7iBBPGfX8kE8cd9SPap0AA96Zg",
                    likesCount = 342,
                    commentsCount = 98
                )
            )

            postRepository.saveAll(posts)
            println("Added ${posts.size} test posts for user $testEmail")
        } else {
            println("Posts for test user already exists, skipping...")
        }
    }
}