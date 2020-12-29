package org.kiworkshop.snowball.note.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.common.config.auth.LoginUser;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponseDto;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteResponseDto;
import org.kiworkshop.snowball.note.service.NoteService;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/notes")
    public NoteCreateResponseDto createNote(@Valid @RequestBody NoteRequestDto noteRequestDto, @LoginUser User user) {
        return noteService.createNote(noteRequestDto, user);
    }

    @GetMapping("/notes")
    public Page<NoteResponseDto> getNotes(
            @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        // DTO를 만들고
        // PageRequest.of()
        // limit + timeout
        return noteService.getNotes(pageable);
    }

    @GetMapping("/notes/{id}")
    public NoteResponseDto getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @PutMapping("/notes/{id}")
    public void updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequestDto noteRequestDto, @LoginUser User user) {
        noteService.updateNote(id, noteRequestDto, user);
    }

    @DeleteMapping("/notes/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }
}
