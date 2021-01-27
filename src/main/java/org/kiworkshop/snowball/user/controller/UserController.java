package org.kiworkshop.snowball.user.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserResponse;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
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
