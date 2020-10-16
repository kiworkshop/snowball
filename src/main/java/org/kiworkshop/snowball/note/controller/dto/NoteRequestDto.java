package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.user.entity.User;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class NoteRequestDto {

    private String text;

    @NotNull
    private LocalDate investmentDate;

    @NotNull
    private User user;

    @Builder
    public NoteRequestDto(String text, LocalDate investmentDate, User user) {
        this.text = text;
        this.investmentDate = investmentDate;
        this.user = user;
    }
}
