package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class NoteCreateRequestDto {

    private String text;
    private LocalDate investmentDate;

    @Builder
    public NoteCreateRequestDto(String text, LocalDate investmentDate) {
        this.text = text;
        this.investmentDate = investmentDate;
    }
}
