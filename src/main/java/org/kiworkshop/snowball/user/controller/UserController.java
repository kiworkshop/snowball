package org.kiworkshop.snowball.user.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserResponse;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/users/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/me")
    public UserResponse me() {
        return userService.getMe();
    }
}
