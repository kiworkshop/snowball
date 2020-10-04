package org.kiworkshop.snowball.user.service;

import lombok.RequiredArgsConstructor;
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
        return getUserResponseDto(user);
    }

    private UserCreateResponseDto getUserResponseDto(User user) {
        return UserCreateResponseDto.builder()
                .email(user.getEmail())
                .pictureUrl(user.getPictureUrl())
                .build();
    }
}

