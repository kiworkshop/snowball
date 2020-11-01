package org.kiworkshop.snowball.note.controller.dto;

import org.kiworkshop.snowball.note.entity.Note;

public class NoteAssembler {

    public static Note getNote(NoteRequestDto noteRequestDto){
        return Note.builder()
                .title(noteRequestDto.getTitle())
                .content(noteRequestDto.getContent())
                .user(noteRequestDto.getUser())
                .investmentDate(noteRequestDto.getInvestmentDate())
                .stockTransactions(noteRequestDto.getStockTransactions())
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
                .title(note.getTitle())
                .content(note.getContent())
                .investmentDate(note.getInvestmentDate())
                .stockTransactions(note.getStockTransactions())
                .createdDate(note.getCreatedDate())
                .modifiedDate(note.getModifiedDate())
                .build();
    }
}
