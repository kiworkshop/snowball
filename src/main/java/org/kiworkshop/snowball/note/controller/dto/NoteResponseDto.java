package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class NoteResponseDto {

    private Long id;
    private String text;
    private LocalDate investmentDate;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

    @Builder
    public NoteResponseDto(Long id, String text, LocalDate investmentDate, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.text = text;
        this.investmentDate = investmentDate;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }
}
