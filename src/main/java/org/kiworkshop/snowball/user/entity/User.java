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

    @Builder
    public User(String email, String name, String pictureUrl) {
        this.email = email;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }
}
