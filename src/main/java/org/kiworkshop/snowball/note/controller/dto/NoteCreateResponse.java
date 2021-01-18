package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class NoteCreateResponse {

    private Long id;

    @Builder
    public NoteCreateResponse(Long id) {
        this.id = id;
    }
}
