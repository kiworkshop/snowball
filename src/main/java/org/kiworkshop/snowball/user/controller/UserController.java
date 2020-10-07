package org.kiworkshop.snowball.user.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserCommonResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserLoginRequestDto;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public UserCreateResponseDto createUser(@RequestBody UserCreateRequestDto userCreateRequestDto) {
        return userService.join(userCreateRequestDto);
    }

    @GetMapping("/users/{id}")
    public UserCommonResponseDto getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/login")
    public UserCommonResponseDto login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return userService.login(userLoginRequestDto);
    }
}
