package org.kiworkshop.snowball.note.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponse;
import org.kiworkshop.snowball.note.controller.dto.NotePageRequest;
import org.kiworkshop.snowball.note.controller.dto.NoteRequest;
import org.kiworkshop.snowball.note.controller.dto.NoteResponse;
import org.kiworkshop.snowball.note.service.NoteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/notes")
    public NoteCreateResponse createNote(@Valid @RequestBody NoteRequest noteRequest) {
        return noteService.createNote(noteRequest);
    }

    @GetMapping("/notes/{id}")
    public NoteResponse getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @GetMapping("/notes")
    public Page<NoteResponse> getNotes(@RequestParam int page, @RequestParam int size) {
        // limit + timeout
        PageRequest pageRequest = PageRequest.of(
                page, size,
                Sort.by("createdDate").descending());

        return noteService.getNotes(pageRequest);
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
