package org.kiworkshop.snowball.note.entity;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.IntegrationTest;
import org.kiworkshop.snowball.common.vo.StockTransactionFixture;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class NoteRepositoryTest extends IntegrationTest {

    @Autowired
    private NoteRepository dut;


    @Test
    void save_note_with_stock_transaction() {
        //given
        Note note = Note.builder()
                .text("test")
                .stockTransactions(StockTransactionFixture.createList())
                .investmentDate(LocalDate.now())
                .build();

        //when
        Note saved = dut.save(note);

        //then
        assertThat(note.getText()).isEqualTo(saved.getText());
        assertThat(note.getInvestmentDate()).isEqualTo(saved.getInvestmentDate());
        assertThat(note.getStockTransactions().get(0)).isEqualToComparingFieldByField(saved.getStockTransactions().get(0));
        assertNotNull(saved.getCreatedDate());
    }
}