package org.kiworkshop.snowball.auth.dto;

import lombok.Getter;
import org.kiworkshop.snowball.user.entity.User;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String pictureUrl;

    public SessionUser(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.pictureUrl = user.getPictureUrl();
    }
}