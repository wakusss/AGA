package com.aga.agaChat.security

import com.aga.agaChat.service.JwtService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userDetailsService: UserDetailsService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // 1. get Authorization Header
        val authHeader = request.getHeader("Authorization") ?: return filterChain.doFilter(request, response)

        // 2. Check, if starts with "Bearer "
        if (!authHeader.startsWith("Bearer ")) {
            return filterChain.doFilter(request, response)
        }

        // 3. extract token (after "Bearer ")
        val jwt = authHeader.substring(7)

        // 4. try to extract email (subject) from token
        val email = jwtService.extractEmail(jwt) ?: return filterChain.doFilter(request, response)

        // 5. Check, if SecurityContext already contain authentication
        //    (чтобы не перезаписывать каждый раз)
        if (SecurityContextHolder.getContext().authentication == null) {
            try {
                // 6. load full user data from bd
                val userDetails: UserDetails = userDetailsService.loadUserByUsername(email)

                // 7. check, if token is valid for that user
                if (jwtService.isValid(jwt, userDetails)) {
                    // 8. create Authentication object
                    val authenticationToken = UsernamePasswordAuthenticationToken(
                        userDetails,           // principal
                        null,                // credentials (не нужны для JWT)
                        userDetails.authorities          // roles
                    )

                    // 9. add request details (IP, session etc.)
                    authenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)

                    // 10. set authentication in context
                    SecurityContextHolder.getContext().authentication = authenticationToken
                }
            } catch (e: Exception) {
                // logger can be added
                logger.warn("JWT validation failed for token: $jwt", e)
            }
        }

        // 11. Continue filter chain
        filterChain.doFilter(request, response)
    }
}