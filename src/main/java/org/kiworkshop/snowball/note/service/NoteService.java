package org.kiworkshop.snowball.note.service;

import org.kiworkshop.snowball.note.controller.dto.NoteCreateRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponseDto;
import org.kiworkshop.snowball.note.controller.dto.NotePageRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class NoteService {

    public NoteCreateResponseDto createNote(NoteCreateRequestDto noteCreateRequestDto) {
        return new NoteCreateResponseDto();
    }

    public Page<NoteResponseDto> getNotes(NotePageRequestDto notePageRequestDto) {
        return new PageImpl<>(new ArrayList<>());
    }

    public NoteResponseDto getNote(Long id) {
        return new NoteResponseDto();
    }
}
