package org.kiworkshop.snowball.user.controller.dto;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.user.entity.User;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserAssembler {

    public static UserResponse getUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .pictureUrl(user.getPictureUrl())
                .build();
    }
}
