package org.kiworkshop.snowball.note.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.IntegrationTest;
import org.kiworkshop.snowball.auth.AuthenticationFixture;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponse;
import org.kiworkshop.snowball.note.controller.dto.NoteRequest;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestFixture;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailRepository;
import org.kiworkshop.snowball.stockdetail.service.StockDetailService;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.assertj.core.api.Assertions.assertThat;

class NoteServiceIntegrationTest extends IntegrationTest {

    @Autowired
    private NoteService noteService;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StockTransactionRepository stockTransactionRepository;
    @Autowired
    private StockDetailRepository stockDetailRepository;

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.create());
        SecurityContextHolder.getContext().setAuthentication(AuthenticationFixture.create());
    }

    @AfterEach
    void tearDown() {
        stockTransactionRepository.deleteAll();
        noteRepository.deleteAll();
        userRepository.deleteAll();
    }

    @DisplayName("Note가 생성될 때 StockTransaction도 함께 생성된다.")
    @Test
    void noteCreateWithStockTransaction() {
        //given
        NoteRequest noteRequest = NoteRequestFixture.create();

        //when
        NoteCreateResponse noteCreateResponse = noteService.createNote(noteRequest);

        //then
        StockTransaction saved = stockTransactionRepository.findAll().get(0);
        StockTransactionRequest stockTransactionRequest = noteRequest.getStockTransactionRequests().get(0);
        assertThat(saved.getQuantity()).isEqualTo(stockTransactionRequest.getQuantity());
        assertThat(saved.getTradedPrice()).isEqualTo(stockTransactionRequest.getTradedPrice());
        assertThat(saved.getTransactionType()).isEqualTo(stockTransactionRequest.getTransactionType());
        assertThat(saved.getNote()).isNotNull();
        assertThat(saved.getNote().getId()).isEqualTo(noteCreateResponse.getId());
    }
}
