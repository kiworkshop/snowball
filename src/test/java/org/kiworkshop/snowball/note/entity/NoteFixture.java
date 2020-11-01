package org.kiworkshop.snowball.note.entity;

import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class NoteFixture {
    public static Note create(){
        Note note = Note.builder()
                .content("NoteFixture")
                .investmentDate(LocalDate.MIN)
                .stockTransactions(StockTransactionFixture.createList())
                .build();
        ReflectionTestUtils.setField(note, "id", 1L);
        ReflectionTestUtils.setField(note, "createdDate", LocalDateTime.MIN);
        ReflectionTestUtils.setField(note, "modifiedDate", LocalDateTime.MIN);
        return note;
    }
}
