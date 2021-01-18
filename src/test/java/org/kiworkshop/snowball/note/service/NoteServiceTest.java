package org.kiworkshop.snowball.note.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponse;
import org.kiworkshop.snowball.note.controller.dto.NoteRequest;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestFixture;
import org.kiworkshop.snowball.note.controller.dto.NoteResponse;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteFixture;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.note.entity.PageNoteFixture;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.BDDAssertions.thenThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {

    @Mock
    private NoteRepository noteRepository;
    @Mock
    private StockTransactionRepository stockTransactionRepository;
    @InjectMocks
    private NoteService dut;
    @Mock
    private IAuthenticationFacade authenticationFacade;

    @Test
    void createTest() {
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
    void getNoteWithStockTransaction() {
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
    void getNote() {
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
        assertThat(responseDto.getStockTransactionResponses().get(0).getStockDetailResponse().getCompanyName())
                .isEqualTo(note.getStockTransactions().get(0).getStockDetail().getCompanyName());
        assertThat(responseDto.getStockTransactionResponses().get(0).getTradedPrice())
                .isEqualTo(note.getStockTransactions().get(0).getTradedPrice());
    }

    // TODO: 2021-01-14(014) getNotes 테스트 수정 
/*    @Test
    void getNotes() {
        // given
        int page = 1;
        int size = 2;
        PageImpl<Note> pageNote = PageNoteFixture.create();
        given(noteRepository.findAll(any(PageRequest.class))).willReturn(pageNote);

        // when
        Page<NoteResponse> pageNoteResponse = dut.getNotes(PageRequest.of(page, size));

        // then
        assertThat(pageNoteResponse.getTotalElements()).isEqualTo(pageNote.getSize());
        assertThat(pageNoteResponse.getContent().get(0).getId()).isEqualTo(pageNote.getContent().get(0).getId());
        assertThat(pageNoteResponse.getContent().get(1).getId()).isEqualTo(2L);
        assertThat(pageNoteResponse.getContent().get(0))
                .isEqualToComparingFieldByField(pageNote.getContent().get(0));
        assertThat(pageNoteResponse.getContent().get(1))
                .isEqualToComparingFieldByField(pageNote.getContent().get(1));
    }*/

    @Test
    void updateNoteTest() {
        // given
        Note note = NoteFixture.create();
        NoteRequest requestDto = NoteRequestFixture.createUpdateRequest();

        given(authenticationFacade.getUser()).willReturn(UserFixture.create());
        given(noteRepository.findByIdAndUserId(any(), any())).willReturn(Optional.of(note));

        // when
        dut.updateNote(1L, requestDto);

        // then
        assertThat(note.getTitle()).isEqualTo(requestDto.getTitle());
        assertThat(note.getInvestmentDate()).isEqualTo(requestDto.getInvestmentDate());
        assertThat(note.getStockTransactions().get(0).getQuantity())
                .isEqualToComparingFieldByField(requestDto.getStockTransactionRequests().get(0).getQuantity());
        assertThat(note.getStockTransactions().get(0).getStockDetail())
                .isEqualToComparingFieldByField(requestDto.getStockTransactionRequests().get(0).getStockDetail());
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