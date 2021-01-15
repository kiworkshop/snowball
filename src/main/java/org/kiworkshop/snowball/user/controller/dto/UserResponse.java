package org.kiworkshop.snowball.user.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserResponse {

    private Long id;
    private String name;
    private String pictureUrl;

    @Builder
    public UserResponse(Long id, String name, String pictureUrl) {
        this.id = id;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }
}
