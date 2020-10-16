package org.kiworkshop.snowball.user.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class UserCreateRequestDto {

    @NotNull @Email
    private String email;
    @NotEmpty
    private String name;
    private int age;
    private String gender;
    private String pictureUrl;

    @Builder
    public UserCreateRequestDto(String email, String name, int age, String gender, String pictureUrl) {
        this.email = email;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.pictureUrl = pictureUrl;
    }
}
