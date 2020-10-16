package org.kiworkshop.snowball.note.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.user.entity.User;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
public class Note extends BaseTimeEntity {

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
