package org.kiworkshop.snowball.note.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.service.StockTransactionService;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Month;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        addStockTransactionsToNote(noteRequest.getStockTransactionRequests(), note);

        Note saved = noteRepository.save(note);

        return NoteAssembler.getNoteCreateResponse(saved);
    }

    public void addStockTransactionsToNote(List<StockTransactionRequest> stockTransactionRequests, Note note) {
        List<StockTransaction> stockTransactions = stockTransactionService.createStockTransactions(stockTransactionRequests);
        note.addStockTransactions(stockTransactions);
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

    public Page<NoteResponse> getNotes(Pageable pageable) {
        User user = authenticationFacade.getUser();
        Page<Note> notePage = noteRepository.findAllByUserId(pageable, user.getId());
        return notePage.map(NoteAssembler::getNoteResponse);
    }

    @Transactional
    public void updateNote(Long id, NoteRequest noteRequest) {
        User user = authenticationFacade.getUser();
        Note note = getByIdAndUserId(id, user.getId());
        Note noteToUpdate = NoteAssembler.getNote(noteRequest, user);

        addStockTransactionsToNote(noteRequest.getStockTransactionRequests(), noteToUpdate);

        note.update(noteToUpdate);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    // TODO: 2021-03-01(001) 리팩토링 필요
    public Map<LocalDate, List<NoteResponse>> getNotesByMonth(YearMonthRequest yearMonthRequest) {
        User user = authenticationFacade.getUser();
        YearMonth yearMonth = yearMonthRequest.getYearMonth();
        int year = yearMonth.getYear();
        Month month = yearMonth.getMonth();

        List<Note> notesByMonth = getNotesByMonthAndUserId(user, year, month);
        Map<LocalDate, List<NoteResponse>> notesByDay = getNotesByDay(notesByMonth);
        return notesByDay;
    }

    public List<Note> getNotesByMonthAndUserId(User user, int year, Month month) {
        return noteRepository.findByUserIdAndInvestmentDateBetween(
                user.getId(),
                LocalDate.of(year, month, LocalDate.MIN.getDayOfMonth()),
                LocalDate.of(year, month, month.minLength())); // TODO: 2021-02-25(025) 윤년 체크
    }

    public Map<LocalDate, List<NoteResponse>> getNotesByDay(List<Note> notes) {
        Map<LocalDate, List<NoteResponse>> notesByDay = new HashMap<>();
        for (Note note : notes) {
            LocalDate investmentDate = note.getInvestmentDate();
            List<NoteResponse> noteResponses = new ArrayList<>();
            if (notesByDay.containsKey(investmentDate)) {
                noteResponses = notesByDay.get(investmentDate);
                if (noteResponses.size() > 3) {
                    continue;
                }
            }
            noteResponses.add(NoteAssembler.getNoteResponse(note));
            notesByDay.put(investmentDate, noteResponses);
        }

        return notesByDay;
    }
}
