package org.kiworkshop.snowball.note.entity;

import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class NoteFixture {

    public static Note create() {
        return Note.builder()
                .user(UserFixture.create())
                .title("투자노트 제목입니다.")
                .content("투자노트 내용입니다.")
                .investmentDate(LocalDate.now())
                .stockTransactions(StockTransactionFixture.createList())
                .build();
    }

    public static Note createWithUser(User user) {
        return Note.builder()
                .user(user)
                .title("투자노트 제목입니다.")
                .content("투자노트 내용입니다.")
                .investmentDate(LocalDate.now())
                .stockTransactions(StockTransactionFixture.createList())
                .build();
    }

    public static List<Note> createList() {
        List<Note> notes = new ArrayList<>();

        notes.add(create());
        notes.add(create());

        return notes;
    }

    public static PageImpl<Note> createNotePage() {
        return new PageImpl<>(createList());
    }
}
