package org.kiworkshop.snowball.user.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserLoginRequestDto;
import org.kiworkshop.snowball.user.domain.User;
import org.kiworkshop.snowball.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Long TEST_USER_ID = 1L;

    private final UserRepository userRepository;

    public UserResponseDto join(UserCreateRequestDto userCreateRequestDto) {
        User user = UserModelMapper.getUser(userCreateRequestDto);
        userRepository.save(user);
        return UserModelMapper.getUserCommonResponseDto(user);
    }

    public UserResponseDto getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("잘못된 user id입니다."));
        return UserModelMapper.getUserCommonResponseDto(user);
    }

    public UserResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        return getUser(TEST_USER_ID);
    }
}

