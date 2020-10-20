package org.kiworkshop.snowball.note.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.common.vo.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Note extends BaseTimeEntity {

    private String text;
    private LocalDate investmentDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ElementCollection
    @CollectionTable(name = "stock_transaction", joinColumns = @JoinColumn(name = "id"))
    private List<StockTransaction> stockTransactions;

    @Builder
    public Note(String text, LocalDate investmentDate, User user, List<StockTransaction> stockTransactions) {
        this.text = text;
        this.investmentDate = investmentDate;
        this.user = user;
        this.stockTransactions = stockTransactions;
    }

    public void update(Note note) {
        this.text = note.getText();
        this.investmentDate = note.getInvestmentDate();
        this.user = note.getUser();
        this.stockTransactions = note.getStockTransactions();
    }
}
