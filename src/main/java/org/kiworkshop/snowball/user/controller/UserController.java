package org.kiworkshop.snowball.user.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserLoginRequestDto;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public UserResponseDto createUser(@RequestBody UserCreateRequestDto userCreateRequestDto) {
        return userService.join(userCreateRequestDto);
    }

    @GetMapping("/users/{id}")
    public UserResponseDto getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/login")
    public UserResponseDto login(@RequestBody(required = false) UserLoginRequestDto userLoginRequestDto) {
        return userService.login(userLoginRequestDto);
    }
}
