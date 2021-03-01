package org.kiworkshop.snowball.note.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.service.NoteService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

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
        // TODO: 2021-03-01(001) limit + timeout
        return noteService.getNotes(new NotePageRequest(page, size));
    }

    @PostMapping("/notes/month")
    public Map<LocalDate, List<NoteResponse>> getNotesByMonth(YearMonthRequest yearMonthRequest) {
        return noteService.getNotesByMonth(yearMonthRequest);
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
