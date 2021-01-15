package org.kiworkshop.snowball.note.controller.dto;

import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.user.entity.User;

// NoteAssembler도 컴포넌트로 만들어주면 이점이 있을까? static메서드를 쓰는 것과의 차이점은?
public class NoteAssembler {

    public static Note getNote(NoteRequest noteRequest, User user){
        return Note.builder()
                .title(noteRequest.getTitle())
                .content(noteRequest.getContent())
                .user(user)
                .investmentDate(noteRequest.getInvestmentDate())
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
