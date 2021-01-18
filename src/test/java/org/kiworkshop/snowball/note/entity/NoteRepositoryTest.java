package org.kiworkshop.snowball.note.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.IntegrationTest;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class NoteRepositoryTest extends IntegrationTest {

    @Autowired
    private NoteRepository dut;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StockTransactionRepository stockTransactionRepository;

    private Note note;
    private User user;

    @BeforeEach
    void setUp() {
        user = UserFixture.create();
        userRepository.save(user);

        note = NoteFixture.createWithUser(user);
    }

    @AfterEach
    void tearDown() {
        stockTransactionRepository.deleteAll();
        dut.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void save_note_with_stock_transaction() {
        //when
        Note saved = dut.save(note);

        //then
        assertThat(saved.getContent()).isEqualTo(note.getContent());
        assertThat(saved.getInvestmentDate()).isEqualTo(note.getInvestmentDate());
        assertThat(saved.getStockTransactions().get(0)).isEqualToComparingFieldByField(note.getStockTransactions().get(0));
        assertNotNull(saved.getCreatedDate());
    }

    @Test
    void findByIdAndUserIdTest() {
        // when
        Note saved = dut.save(note);
        Optional<Note> given = dut.findByIdAndUserId(saved.getId(), user.getId());

        // then
        assertThat(given).isPresent();
        assertThat(given.get().getUser().getId()).isEqualTo(saved.getUser().getId());
        assertThat(given.get().getInvestmentDate()).isEqualTo(saved.getInvestmentDate());
        assertThat(given.get().getTitle()).isEqualTo(saved.getTitle());
    }
}