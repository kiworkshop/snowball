package org.kiworkshop.snowball.note.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.service.NoteService;
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
    public NoteCreateResponse createNote(@Valid @RequestBody NoteRequest noteRequest) {
        return noteService.createNote(noteRequest);
    }

    @GetMapping("/notes")
    public Page<NoteResponse> getNotes(
            @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        // DTO를 만들고
        // PageRequest.of()
        // limit + timeout

        NotePageRequest notePageRequest = (NotePageRequest) PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());

        //return noteService.getNotes(pageable);
        return null;
    }

    @GetMapping("/notes/{id}")
    public NoteResponse getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @PutMapping("/notes/{id}")
    public void updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequest noteRequest) {
        noteService.updateNote(id, noteRequest);
    }

    @DeleteMapping("/notes/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }
}
