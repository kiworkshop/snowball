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
    private String pictureUrl;

    @Builder
    public UserCreateRequestDto(String email, String name, String pictureUrl) {
        this.email = email;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }
}
