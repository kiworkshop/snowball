package org.kiworkshop.snowball.note.controller.dto;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.user.entity.User;

import java.util.ArrayList;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class NoteAssembler {

    public static Note getNote(NoteRequest noteRequest, User user){
        return Note.builder()
                .title(noteRequest.getTitle())
                .content(noteRequest.getContent())
                .user(user)
                .investmentDate(noteRequest.getInvestmentDate())
                .stockTransactions(new ArrayList<>())
                .build();
    }

    public static NoteCreateResponse getNoteCreateResponse(Note note) {
        return NoteCreateResponse.builder()
                .id(note.getId())
                .build();
    }

    public static NoteResponse getNoteResponse(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .investmentDate(note.getInvestmentDate())
                .stockTransactionResponses(StockTransactionAssembler.getStockTransactionResponses(note.getStockTransactions()))
                .createdDate(note.getCreatedDate())
                .modifiedDate(note.getModifiedDate())
                .build();
    }
}
