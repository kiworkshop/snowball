package org.kiworkshop.snowball.user.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserCommonResponseDto {

    private String email;
    private String name;
    private String pictureUrl;

    @Builder
    public UserCommonResponseDto(String email, String name, String pictureUrl) {
        this.email = email;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }
}
