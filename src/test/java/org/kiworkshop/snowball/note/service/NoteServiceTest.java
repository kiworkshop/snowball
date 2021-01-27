package org.kiworkshop.snowball.note.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteFixture;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.stocktransaction.service.StockTransactionService;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.BDDAssertions.thenThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {

    @InjectMocks
    private NoteService dut;
    @Mock
    private NoteRepository noteRepository;
    @Mock
    private StockTransactionService stockTransactionService;
    @Mock
    private StockTransactionRepository stockTransactionRepository;
    @Mock
    private IAuthenticationFacade authenticationFacade;

    @Test
    void createNoteTest() {
        //given
        given(authenticationFacade.getUser()).willReturn(UserFixture.create());
        Note note = NoteFixture.create();
        ReflectionTestUtils.setField(note, "id", 1L);
        given(noteRepository.save(any(Note.class))).willReturn(note);

        //when
        NoteCreateResponse noteCreateResponse = dut.createNote(NoteRequestFixture.create());

        //then
        assertThat(noteCreateResponse.getId()).isEqualTo(1L);
        then(noteRepository).should().save(any(Note.class));
    }

    @Test
    void getNoteWithStockTransactionTest() {
        //given
        Note noteFixture = NoteFixture.create();
        given(noteRepository.findById(anyLong())).willReturn(Optional.of(noteFixture));

        //when
        Note note = dut.getById(1L);
        List<StockTransaction> stockTransactions = note.getStockTransactions();

        //then
        assertThat(stockTransactions.size()).isEqualTo(noteFixture.getStockTransactions().size());
        assertThat(stockTransactions.get(0).getTransactionType())
                .isEqualByComparingTo(noteFixture.getStockTransactions().get(0).getTransactionType());
        assertThat(stockTransactions.get(1).getTransactionType())
                .isEqualByComparingTo(noteFixture.getStockTransactions().get(1).getTransactionType());
    }

    @Test
    void getNoteTest() {
        //given
        given(authenticationFacade.getUser()).willReturn(UserFixture.create());
        Note note = NoteFixture.create();
        given(noteRepository.findByIdAndUserId(any(), any())).willReturn(Optional.of(note));

        //when
        NoteResponse responseDto = dut.getNote(1L);

        //then
        assertThat(responseDto.getInvestmentDate()).isEqualTo(note.getInvestmentDate());
        assertThat(responseDto.getContent()).isEqualTo(note.getContent());
        assertThat(responseDto.getStockTransactionResponses().size()).isEqualTo(note.getStockTransactions().size());
        assertThat(responseDto.getStockTransactionResponses().get(0).getStockDetailResponse().getId())
                .isEqualTo(note.getStockTransactions().get(0).getStockDetail().getId());
        assertThat(responseDto.getStockTransactionResponses().get(0).getTradedPrice())
                .isEqualTo(note.getStockTransactions().get(0).getTradedPrice());
    }

    @Test
    void getNotesTest() {
        // given
        PageRequest notePageRequest = NotePageRequestFixture.createPageRequest();
        Page<Note> notePage = NoteFixture.createNotePage();

        given(noteRepository.findAll(any(Pageable.class))).willReturn(notePage);

        // when
        Page<NoteResponse> notePageResponse = dut.getNotes(notePageRequest);

        // then
        assertThat(notePageResponse.getTotalElements()).isEqualTo(notePage.getSize());
        NoteResponse noteResponse = notePageResponse.getContent().get(0);
        Note note = notePage.getContent().get(0);
        assertThat(noteResponse.getTitle()).isEqualTo(note.getTitle());
        assertThat(noteResponse.getInvestmentDate()).isEqualTo(note.getInvestmentDate());
        assertThat(noteResponse.getStockTransactionResponses().get(0).getTradedPrice())
                .isEqualTo(note.getStockTransactions().get(0).getTradedPrice());
    }

    @Test
    void updateNoteTest() {
        // given
        Note note = NoteFixture.create();
        NoteRequest updateRequest = NoteRequestFixture.createUpdateRequest();

        given(authenticationFacade.getUser()).willReturn(UserFixture.create());
        given(noteRepository.findByIdAndUserId(any(), any())).willReturn(Optional.of(note));
        given(stockTransactionService.createStockTransactions(anyList())).willReturn(
                StockTransactionFixture.createUpdateList(updateRequest));

        // when
        dut.updateNote(1L, updateRequest);

        // then
        assertThat(note.getTitle()).isEqualTo(updateRequest.getTitle());
        assertThat(note.getInvestmentDate()).isEqualTo(updateRequest.getInvestmentDate());
        List<StockTransaction> stockTransactions = note.getStockTransactions();
        List<StockTransactionRequest> stockTransactionRequests = updateRequest.getStockTransactionRequests();
        assertThat(stockTransactions.get(0).getQuantity())
                .isEqualTo(stockTransactionRequests.get(0).getQuantity());
        assertThat(stockTransactions.get(0).getStockDetail().getId())
                .isEqualTo(stockTransactionRequests.get(0).getStockDetailId());
    }

    @Test
    void deleteNoteTest() {
        Long noteId = 1L;

        // when
        dut.deleteNote(noteId);

        // then
        then(noteRepository).should().deleteById(anyLong());
        verify(noteRepository).deleteById(anyLong());
    }

    @Test
    void getByIdThrowsException() {
        // given
        given(authenticationFacade.getUser()).willReturn(UserFixture.create());
        given(noteRepository.findByIdAndUserId(any(), any())).willReturn(Optional.empty());

        // then
        thenThrownBy(() -> dut.getNote(1L))
                .isInstanceOf(DomainServiceException.class)
                .hasMessage("노트가 존재하지 않습니다.");
    }
}