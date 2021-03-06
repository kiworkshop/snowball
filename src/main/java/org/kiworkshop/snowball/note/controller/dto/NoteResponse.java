package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class NoteResponse {

    private Long id;
    private String title;
    private String content;
    private LocalDate investmentDate;
    private List<StockTransactionResponse> stockTransactions;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @Builder
    public NoteResponse(Long id, String title, String content, LocalDate investmentDate,
                        List<StockTransactionResponse> stockTransactionResponses,
                        LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.investmentDate = investmentDate;
        this.stockTransactions = stockTransactionResponses;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }
}
