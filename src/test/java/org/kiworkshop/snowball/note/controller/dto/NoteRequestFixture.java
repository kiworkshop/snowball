package org.kiworkshop.snowball.note.controller.dto;

import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequestFixture;

import java.time.LocalDate;

public class NoteRequestFixture {

    public static NoteRequest create() {
        return NoteRequest.builder()
                .title("투자노트 제목입니다.")
                .content("투자노트 텍스트입니다.")
                .investmentDate(LocalDate.now())
                .stockTransactionRequests(StockTransactionRequestFixture.createList())
                .build();
    }

    public static NoteRequest createUpdateRequest() {
        return NoteRequest.builder()
                .title("update된 투자노트 제목입니다.")
                .content("update된 투자노트 텍스트입니다.")
                .investmentDate(LocalDate.now().minusDays(1L))
                .stockTransactionRequests(StockTransactionRequestFixture.createList())
                .build();
    }
}
