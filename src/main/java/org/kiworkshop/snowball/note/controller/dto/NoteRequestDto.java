package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
public class NoteRequestDto {

    @NotEmpty
    private String title;
    private String content;
    @NotNull
    private LocalDate investmentDate;
    private User user;
    // dto로 받기
    private List<StockTransaction> stockTransactions;

    @Builder
    public NoteRequestDto(String title, String content, LocalDate investmentDate, User user, List<StockTransaction> stockTransactions) {
        this.title = title;
        this.content = content;
        this.investmentDate = investmentDate;
        this.user = user;
        this.stockTransactions = stockTransactions;
    }
}
