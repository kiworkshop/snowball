package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.user.domain.User;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class NoteCreateRequestDto {

    private String text;
    private LocalDate investmentDate;
    private User user;

    @Builder
    public NoteCreateRequestDto(String text, LocalDate investmentDate, User user) {
        this.text = text;
        this.investmentDate = investmentDate;
        this.user = user;
    }
}
