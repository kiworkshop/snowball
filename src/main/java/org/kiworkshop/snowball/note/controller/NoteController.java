package org.kiworkshop.snowball.note.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponseDto;
import org.kiworkshop.snowball.note.controller.dto.NotePageRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteResponseDto;
import org.kiworkshop.snowball.note.service.NoteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/notes")
    public NoteCreateResponseDto createNote(@RequestBody NoteRequestDto noteRequestDto) {
        return noteService.createNote(noteRequestDto);
    }

    @GetMapping("/notes")
    public Page<NoteResponseDto> getNotes(Pageable pageable) {
        return noteService.getNotes(pageable);
    }

    @GetMapping("/notes/{id}")
    public NoteResponseDto getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @PutMapping("/notes/{id}")
    public void updateNote(@PathVariable Long id, @RequestBody NoteRequestDto noteRequestDto) {
        noteService.updateNote(id, noteRequestDto);
    }
}
