package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class NoteRequest {

    @NotEmpty
    private String title;
    private String content;
    @NotNull
    private LocalDate investmentDate;
    private List<StockTransactionRequest> stockTransactions;

    @Builder
    public NoteRequest(String title, String content, LocalDate investmentDate, List<StockTransactionRequest> stockTransactionRequests) {
        this.title = title;
        this.content = content;
        this.investmentDate = investmentDate;
        this.stockTransactions = stockTransactionRequests;
    }
}

