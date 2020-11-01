package org.kiworkshop.snowball.user.Entity;

import org.kiworkshop.snowball.user.entity.User;
import org.springframework.test.util.ReflectionTestUtils;

public class UserFixture {

    public static User create() {
        User user = User.builder().build();
        ReflectionTestUtils.setField(user, "id", 1L);
        ReflectionTestUtils.setField(user, "email", "snowman");
        ReflectionTestUtils.setField(user, "name", "snowman");
        ReflectionTestUtils.setField(user, "pictureUrl", "example.snowman-picture.com");
        return user;
    }
}
