package com.aga.agaChat.service

import com.aga.agaChat.models.entity.User
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.util.Date
import javax.crypto.SecretKey

@Component
class JwtService(
    @Value("\${jwt.secret}") private val secret: String,
    @Value("\${jwt.expiration:86400000}") private val expirationMs: Long
) {
    // Key generates once on initialization
    private val key: SecretKey = Keys.hmacShaKeyFor(secret.toByteArray(Charsets.UTF_8))


    /**
     * Generate JWT-token for user
     * @return JWT-token
     */
    fun generateToken(user: User): String {
        val now = Date()
        val expiryDate = Date(now.time + expirationMs)

        return Jwts.builder()
            .subject(user.email)                      // main identification = email
            .claim("roles", user.role.name)      // added role as claim
            .issuedAt(now)                            // issued date
            .expiration(expiryDate)                   // expiration date
            .signWith(key)                            // sing with our secret key (HS256 as default)
            .compact()                                     // build token string
    }

    /**
     * extract email (subject) from token
     * @return email, if token correct
     * @return null, if token incorrect / expired / forged
     */
    fun extractEmail(token: String): String? {
        return try {
            Jwts.parser()
                .verifyWith(key)                      // check sign
                .build()
                .parseSignedClaims(token)             // parse and check
                .payload                              // get claims
                .subject                              // subject = email
        } catch (e: Exception) {
            null                                      // any exception -> token invalid
        }
    }

    /**
     * Check, if token is valid for that user
     */
    fun isValid(token: String, userDetails: UserDetails): Boolean {
        val email = extractEmail(token) ?: return false

        // check, if email from token = current user email
        if (email != userDetails.username) return false

        // check, if token is valid
        return try {
            Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .payload
                .expiration
                .after(Date())                        // expiration > now
        } catch (e: Exception) {
            false
        }
    }
}