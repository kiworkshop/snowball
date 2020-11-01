package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
public class NoteResponseDto {

    private Long id;
    private String title;
    private String content;
    private LocalDate investmentDate;
    private List<StockTransaction> stockTransactions;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @Builder
    public NoteResponseDto(Long id, String title, String content, LocalDate investmentDate, List<StockTransaction> stockTransactions, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.investmentDate = investmentDate;
        this.stockTransactions = stockTransactions;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }
}
