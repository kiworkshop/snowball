package org.kiworkshop.snowball.user.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.user.controller.dto.UserAssembler;
import org.kiworkshop.snowball.user.controller.dto.UserResponse;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final IAuthenticationFacade authenticationFacade;

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("잘못된 user id입니다."));
        return UserAssembler.getUserResponse(user);
    }

    public UserResponse getMe() {
        User user = authenticationFacade.getUser();
        return UserAssembler.getUserResponse(user);
    }
}

