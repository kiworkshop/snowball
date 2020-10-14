package org.kiworkshop.snowball.note.controller.dto;

import org.kiworkshop.snowball.note.entity.Note;

public class NoteAssembler {

    public static Note getNote(NoteRequestDto noteRequestDto){
        return Note.builder()
                .text(noteRequestDto.getText())
                .user(noteRequestDto.getUser())
                .investmentDate(noteRequestDto.getInvestmentDate())
                .build();
    }
    public static NoteCreateResponseDto getNoteCreateResponseDto(Note note) {
        return NoteCreateResponseDto.builder()
                .id(note.getId())
                .build();
    }

    public static NoteResponseDto getNoteResponseDto(Note note) {
        return NoteResponseDto.builder()
                .id(note.getId())
                .text(note.getText())
                .investmentDate(note.getInvestmentDate())
                .createdDate(note.getCreatedDate())
                .lastModifiedDate(note.getModifiedDate())
                .build();
    }
}
