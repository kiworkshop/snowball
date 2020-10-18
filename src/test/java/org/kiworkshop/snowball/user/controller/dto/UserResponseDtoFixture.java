package org.kiworkshop.snowball.user.controller.dto;

import org.springframework.test.util.ReflectionTestUtils;

public class UserResponseDtoFixture {

    public static UserResponseDto create() {
        UserResponseDto responseDto = UserResponseDto.builder().build();
        ReflectionTestUtils.setField(responseDto, "id", 1L);
        ReflectionTestUtils.setField(responseDto, "name", "snowman");
        ReflectionTestUtils.setField(responseDto, "pictureUrl", "example.snowman-picture.com");
        return responseDto;
    }
}
