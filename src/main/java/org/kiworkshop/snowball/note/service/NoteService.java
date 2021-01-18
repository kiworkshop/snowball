package org.kiworkshop.snowball.note.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final IAuthenticationFacade authenticationFacade;

    @Transactional
    public NoteCreateResponse createNote(NoteRequest noteRequest) {
        User user = authenticationFacade.getUser();
        Note note = NoteAssembler.getNote(noteRequest, user);

        List<StockTransaction> stockTransactions =
                StockTransactionAssembler.getStockTransactions(noteRequest.getStockTransactionRequests(), user);
        note.addStockTransactions(stockTransactions);

        Note saved = noteRepository.save(note);

        return NoteAssembler.getNoteCreateResponse(saved);
    }

    public Page<NoteResponse> getNotes(Pageable pageable) {
        Page<Note> notePage = noteRepository.findAll(pageable);
        return notePage.map(NoteAssembler::getNoteResponse);
    }

    public NoteResponse getNote(Long id) {
        User user = authenticationFacade.getUser();
        Note note = getByIdAndUserId(id, user.getId());
        return NoteAssembler.getNoteResponse(note);
    }

    public Note getById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new DomainServiceException("노트가 존재하지 않습니다."));
    }

    public Note getByIdAndUserId(Long noteId, Long userId) {
        return noteRepository.findByIdAndUserId(noteId, userId).orElseThrow(() -> new DomainServiceException("노트가 존재하지 않습니다."));
    }

    @Transactional
    public void updateNote(Long id, NoteRequest noteRequest) {
        User user = authenticationFacade.getUser();
        Note note = getByIdAndUserId(id, user.getId());
        Note noteToUpdate = NoteAssembler.getNote(noteRequest, user);

        List<StockTransaction> stockTransactions =
                StockTransactionAssembler.getStockTransactions(noteRequest.getStockTransactionRequests(), user);
        noteToUpdate.addStockTransactions(stockTransactions);

        note.update(noteToUpdate);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}
