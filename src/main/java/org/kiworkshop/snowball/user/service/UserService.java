package org.kiworkshop.snowball.user.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserCommonResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateResponseDto;
import org.kiworkshop.snowball.user.domain.User;
import org.kiworkshop.snowball.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserCreateResponseDto join(UserCreateRequestDto userCreateRequestDto) {
        User user = User.builder()
                .email(userCreateRequestDto.getEmail())
                .name(userCreateRequestDto.getName())
                .age(userCreateRequestDto.getAge())
                .gender(userCreateRequestDto.getGender())
                .pictureUrl(userCreateRequestDto.getPictureUrl())
                .build();
        userRepository.save(user);
        return getUserCreateResponseDto(user);
    }

    private UserCreateResponseDto getUserCreateResponseDto(User user) {
        return UserCreateResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .pictureUrl(user.getPictureUrl())
                .build();
    }

    public UserCommonResponseDto getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("잘못된 user id입니다."));
        return getUserCommonResponseDto(user);
    }

    private UserCommonResponseDto getUserCommonResponseDto(User user) {
        return UserCommonResponseDto.builder()
                .email(user.getEmail())
                .name(user.getName())
                .pictureUrl(user.getPictureUrl())
                .build();
    }
}

