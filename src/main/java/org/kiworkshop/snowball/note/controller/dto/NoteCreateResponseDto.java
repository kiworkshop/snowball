package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class NoteCreateResponseDto {

    private Long id;

    @Builder
    public NoteCreateResponseDto(Long id) {
        this.id = id;
    }
}
