package org.kiworkshop.snowball.note.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.NoteAssembler;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponse;
import org.kiworkshop.snowball.note.controller.dto.NoteRequest;
import org.kiworkshop.snowball.note.controller.dto.NoteResponse;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.service.StockTransactionService;
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
    private final StockTransactionService stockTransactionService;
    private final IAuthenticationFacade authenticationFacade;

    @Transactional
    public NoteCreateResponse createNote(NoteRequest noteRequest) {
        User user = authenticationFacade.getUser();
        Note note = NoteAssembler.getNote(noteRequest, user);

        if(noteRequest.getStockTransactionRequests() != null) {
            List<StockTransaction> stockTransactions = stockTransactionService.createStockTransactions(
                    noteRequest.getStockTransactionRequests());
            note.addStockTransactions(stockTransactions);
        }

        Note saved = noteRepository.save(note);

        return NoteAssembler.getNoteCreateResponse(saved);
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
        return noteRepository.findByIdAndUserId(noteId, userId).orElseThrow(() ->
                new DomainServiceException("노트가 존재하지 않습니다."));
    }

    // TODO: 2021-01-22(022) 해당 유저의 노트만 get해오기
    public Page<NoteResponse> getNotes(Pageable pageable) {
        Page<Note> notePage = noteRepository.findAll(pageable);
        return notePage.map(NoteAssembler::getNoteResponse);
    }

    @Transactional
    public void updateNote(Long id, NoteRequest noteRequest) {
        User user = authenticationFacade.getUser();
        Note note = getByIdAndUserId(id, user.getId());
        Note noteToUpdate = NoteAssembler.getNote(noteRequest, user);

        List<StockTransaction> stockTransactions = stockTransactionService.createStockTransactions(
                noteRequest.getStockTransactionRequests());
        noteToUpdate.addStockTransactions(stockTransactions);

        note.update(noteToUpdate);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}

