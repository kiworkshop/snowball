package org.kiworkshop.snowball.user.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserCommonResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserLoginRequestDto;
import org.kiworkshop.snowball.user.domain.User;
import org.kiworkshop.snowball.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Long TEST_USER_ID = 1L;

    private final UserRepository userRepository;

    public UserCreateResponseDto join(UserCreateRequestDto userCreateRequestDto) {
        User user = UserModelMapper.getUser(userCreateRequestDto);
        userRepository.save(user);
        return UserModelMapper.getUserCreateResponseDto(user);
    }

    public UserCommonResponseDto getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("잘못된 user id입니다."));
        return UserModelMapper.getUserCommonResponseDto(user);
    }

    public UserCommonResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        return getUser(TEST_USER_ID);
    }
}

