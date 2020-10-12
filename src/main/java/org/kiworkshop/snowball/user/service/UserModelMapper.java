package org.kiworkshop.snowball.user.service;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.user.controller.dto.UserResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.domain.User;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserModelMapper {

    public static User getUser(UserCreateRequestDto userCreateRequestDto) {
        return User.builder()
                .email(userCreateRequestDto.getEmail())
                .name(userCreateRequestDto.getName())
                .age(userCreateRequestDto.getAge())
                .gender(userCreateRequestDto.getGender())
                .pictureUrl(userCreateRequestDto.getPictureUrl())
                .build();
    }

    public static UserResponseDto getUserCommonResponseDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .pictureUrl(user.getPictureUrl())
                .build();
    }
}
