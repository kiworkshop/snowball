package org.kiworkshop.snowball.user.controller.dto;

import org.springframework.test.util.ReflectionTestUtils;

public class UserCreateRequestDtoFixture {

    public static UserCreateRequestDto create() {
        UserCreateRequestDto requestDto = UserCreateRequestDto.builder().build();
        ReflectionTestUtils.setField(requestDto,"email", "snowman@snowball.com");
        ReflectionTestUtils.setField(requestDto,"name", "snowman");
        ReflectionTestUtils.setField(requestDto,"age",100);
        ReflectionTestUtils.setField(requestDto,"gender","snow");
        ReflectionTestUtils.setField(requestDto,"pictureUrl", "example.snowman-picture.com");
        return requestDto;
    }
}
