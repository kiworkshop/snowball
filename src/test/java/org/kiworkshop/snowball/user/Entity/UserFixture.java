package org.kiworkshop.snowball.user.Entity;

import org.kiworkshop.snowball.user.entity.Role;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;

public class UserFixture {

    public static User create() {
        User user = User.builder()
                .email("snowman")
                .name("snowman")
                .pictureUrl("example.snowman-picture.com")
                .role(Role.USER)
                .build();
        ReflectionTestUtils.setField(user, "id", 1L);
        ReflectionTestUtils.setField(user, "createdDate", LocalDateTime.now());
        ReflectionTestUtils.setField(user, "modifiedDate", LocalDateTime.now());
        return user;
    }
}
