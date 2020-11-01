package org.kiworkshop.snowball.note.controller.dto;

import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.user.entity.User;

import java.time.LocalDate;

public class NoteRequestDtoFixture {

    public static NoteRequestDto create() {
        return NoteRequestDto.builder()
                .title("투자노트 제목입니다.")
                .content("투자노트 텍스트입니다.")
                .investmentDate(LocalDate.now())
                .user(new User())
                .stockTransactions(StockTransactionFixture.createList())
                .build();
    }
}
