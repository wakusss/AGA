package com.aga.agaChat.controllers

import com.aga.agaChat.models.dto.CreatePostDto
import com.aga.agaChat.models.dto.LikeToggledDto
import com.aga.agaChat.models.dto.PostDto
import com.aga.agaChat.models.dto.UpdatePostDto
import com.aga.agaChat.models.dto.UpdateUserDto
import com.aga.agaChat.models.dto.UserDto
import com.aga.agaChat.models.entity.User
import com.aga.agaChat.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/users")
class UserController (
    private val userService: UserService,

    ){
    // @Get
    @GetMapping("/me")
    fun getMe(
    ): UserDto {
        return userService.getMe()
    }

    @GetMapping("/{id}")
    fun getUser(
        @PathVariable("id") id: Long
    ): UserDto  {
        return userService.getUser(id)
    }


    // @Patch
    @PatchMapping("/me")
    fun updateUser(
        @RequestBody dto: UpdateUserDto
    ): UserDto {
        return userService.updateMe(dto)
    }

}