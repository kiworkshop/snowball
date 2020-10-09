package org.kiworkshop.snowball.note.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponseDto;
import org.kiworkshop.snowball.note.controller.dto.NotePageRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteResponseDto;
import org.kiworkshop.snowball.note.service.NoteService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/notes")
    public NoteCreateResponseDto createNote(@RequestBody NoteCreateRequestDto noteCreateRequestDto) {
        return noteService.createNote(noteCreateRequestDto);
    }

    @GetMapping("/notes")
    public Page<NoteResponseDto> getNotes(@RequestBody NotePageRequestDto notePageRequestDto) {
        return noteService.getNotes(notePageRequestDto);
    }

    @GetMapping("/notes/{id}")
    public NoteResponseDto getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }
}
