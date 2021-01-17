package org.kiworkshop.snowball.note.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.IntegrationTest;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDtoFixture;
import org.kiworkshop.snowball.note.controller.dto.NoteResponseDto;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

public class NoteServiceIntegrationTest extends IntegrationTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NoteService noteService;
    @Autowired
    private StockTransactionRepository stockTransactionRepository;

    private User user;

    @BeforeEach
    void setUp() {
        user = userRepository.save(UserFixture.create());
    }

    @Test
    void noteCreateFindStockTransaction() {
        //given
        NoteRequestDto noteRequestDto = NoteRequestDtoFixture.create(user);
        //when
        noteService.createNote(noteRequestDto, user);
        //then
        //assertThat(stockTransactionRepository.findAll()).isEmpty();

        assertThat(stockTransactionRepository.findAll().get(0).getQuantity()).isEqualTo(noteRequestDto.getStockTransactions().get(0).getQuantity());
        assertThat(stockTransactionRepository.findAll().get(0).getTradedPrice()).isEqualTo(noteRequestDto.getStockTransactions().get(0).getTradedPrice());
        assertThat(stockTransactionRepository.findAll().get(0).getTransactionType()).isEqualTo(noteRequestDto.getStockTransactions().get(0).getTransactionType());
        assertThat(stockTransactionRepository.findAll().get(0).getNote()).isNotNull();
    }
}
