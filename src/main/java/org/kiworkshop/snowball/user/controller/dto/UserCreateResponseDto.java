package org.kiworkshop.snowball.user.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserCreateResponseDto {

    private String email;
    private String name;
    private int age;
    private String gender;
    private String pictureUrl;

    @Builder
    public UserCreateResponseDto(String email, String name, int age, String gender, String pictureUrl) {
        this.email = email;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.pictureUrl = pictureUrl;
    }
}
