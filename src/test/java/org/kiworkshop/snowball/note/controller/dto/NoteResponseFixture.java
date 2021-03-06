package org.kiworkshop.snowball.note.controller.dto;

import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionResponseFixture;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class NoteResponseFixture {

    public static NoteResponse create() {
        return NoteResponse.builder()
                .id(1L)
                .title("투자노트 제목입니다.")
                .content("투자노트 텍스트입니다.")
                .investmentDate(LocalDate.of(2020, 10, 10))
                .createdDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .stockTransactionResponses(StockTransactionResponseFixture.createList())
                .build();
    }

    public static List<NoteResponse> createList() {
        List<NoteResponse> noteResponses = new ArrayList<>();
        noteResponses.add(create());
        noteResponses.add(create());
        return noteResponses;
    }

    public static PageImpl<NoteResponse> createNoteResponsePage() {
        List<NoteResponse> noteResponses = NoteResponseFixture.createList();
        return new PageImpl<>(noteResponses);
    }
}
