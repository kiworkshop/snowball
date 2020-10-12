package org.kiworkshop.snowball.note.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.user.domain.User;
import org.kiworkshop.snowball.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteCreateResponseDto createNote(NoteCreateRequestDto noteCreateRequestDto) {
        Note note = noteRepository.save(NoteAssembler.getNote(noteCreateRequestDto));
        return NoteAssembler.getNoteCreateResponseDto(note);
    }

    public Page<NoteResponseDto> getNotes(NotePageRequestDto notePageRequestDto) {
        return new PageImpl<>(new ArrayList<>());
    }

    public NoteResponseDto getNote(Long id) {
        return new NoteResponseDto();
    }
}
