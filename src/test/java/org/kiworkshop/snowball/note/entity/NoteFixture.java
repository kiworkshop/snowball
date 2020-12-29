package org.kiworkshop.snowball.note.entity;

import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class NoteFixture {
    public static Note create(){
        Note note = Note.builder()
                .user(UserFixture.create())
                .content("NoteFixture")
                .investmentDate(LocalDate.MIN)
                .stockTransactions(StockTransactionFixture.createList())
                .build();
        ReflectionTestUtils.setField(note, "id", 1L); // TODO : 삭제
        ReflectionTestUtils.setField(note, "createdDate", LocalDateTime.MIN);
        ReflectionTestUtils.setField(note, "modifiedDate", LocalDateTime.MIN);
        return note;
    }
}
