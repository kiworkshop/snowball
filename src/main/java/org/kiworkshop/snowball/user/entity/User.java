package org.kiworkshop.snowball.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.note.entity.Note;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    private String email;
    private String name;
    private String pictureUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder
    public User(String email, String name, String pictureUrl, Role role) {
        this.name = name;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.role = role;
    }

    public User update(String name, String pictureUrl) {
        this.name = name;
        this.pictureUrl = pictureUrl;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
