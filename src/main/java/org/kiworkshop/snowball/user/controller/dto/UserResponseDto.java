package org.kiworkshop.snowball.user.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserResponseDto {

    private Long id;
    private String name;
    private String pictureUrl;

    @Builder
    public UserResponseDto(Long id, String name, String pictureUrl) {
        this.id = id;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }
}
