package org.kiworkshop.snowball.note.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteCreateResponseDto createNote(NoteRequestDto noteRequestDto) {
        Note note = noteRepository.save(NoteAssembler.getNote(noteRequestDto));
        return NoteAssembler.getNoteCreateResponseDto(note);
    }

    public Page<NoteResponseDto> getNotes(Pageable pageable) {
        Page<Note> notePage = noteRepository.findAll(pageable);
        return notePage.map(NoteAssembler::getNoteResponseDto);
    }

    public NoteResponseDto getNote(Long id) {
        Note note = getById(id);
        return NoteAssembler.getNoteResponseDto(note);
    }

    public Note getById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new DomainServiceException("노트가 존재하지 않습니다."));
    }

    @Transactional
    public void updateNote(Long id, NoteRequestDto noteRequestDto) {
        Note note = getById(id);
        Note noteToUpdate = NoteAssembler.getNote(noteRequestDto);
        note.update(noteToUpdate);
    }
}
