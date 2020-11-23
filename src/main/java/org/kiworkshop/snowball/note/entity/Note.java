package org.kiworkshop.snowball.note.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Note extends BaseTimeEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private String title;
    private String content;
    private LocalDate investmentDate;

    @JsonManagedReference
    @OneToMany(mappedBy = "note", cascade = CascadeType.PERSIST)
    private List<StockTransaction> stockTransactions;

    @Builder
    public Note(String title, String content, LocalDate investmentDate, User user, List<StockTransaction> stockTransactions) {
        this.title = title;
        this.content = content;
        this.investmentDate = investmentDate;
        this.user = user;
        this.stockTransactions = stockTransactions;
    }

    public void update(Note note) {
        this.title = note.getTitle();
        this.content = note.getContent();
        this.investmentDate = note.getInvestmentDate();
        this.user = note.getUser();
        this.stockTransactions = note.getStockTransactions();
    }
}
