package org.kiworkshop.snowball.note.controller.dto;

import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.user.controller.dto.UserResponseDto;
import org.kiworkshop.snowball.user.domain.User;

public class NoteAssembler {

    public static Note getNote(NoteCreateRequestDto noteCreateRequestDto){
        return Note.builder()
                .text(noteCreateRequestDto.getText())
                .user(noteCreateRequestDto.getUser())
                .investmentDate(noteCreateRequestDto.getInvestmentDate())
                .build();
    }
    public static NoteCreateResponseDto getNoteCreateResponseDto(Note note) {
        return NoteCreateResponseDto.builder()
                .id(note.getId())
                .build();
    }
}
