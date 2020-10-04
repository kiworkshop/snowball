package org.kiworkshop.snowball.user.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserCreateResponseDto {

    private String email;
    private String pictureUrl;

    @Builder
    public UserCreateResponseDto(String email, String pictureUrl) {
        this.email = email;
        this.pictureUrl = pictureUrl;
    }
}
