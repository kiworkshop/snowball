package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class NotePageRequestDto {

    private int size;
    private int page;

    @Builder
    public NotePageRequestDto(int size, int page) {
        this.size = size;
        this.page = page;
    }
}

