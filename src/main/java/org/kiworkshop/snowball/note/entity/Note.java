package org.kiworkshop.snowball.note.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class Note extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private LocalDate investmentDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Builder
    public Note(String text, LocalDate investmentDate, User user) {
        this.text = text;
        this.investmentDate = investmentDate;
        this.user = user;
    }

    public void update(Note note) {
        this.text = note.getText();
        this.investmentDate = note.getInvestmentDate();
        this.user = note.getUser();
    }
}
