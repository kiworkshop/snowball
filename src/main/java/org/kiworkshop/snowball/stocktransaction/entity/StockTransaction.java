package org.kiworkshop.snowball.stocktransaction.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.user.entity.User;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Getter
@NoArgsConstructor
@Entity
public class StockTransaction extends BaseTimeEntity {

    @ManyToOne
    private User user;
    @ManyToOne
    private StockDetail stockDetail;
    @JsonBackReference
    @ManyToOne
    private Note note;

    private Long quantity;
    private Long tradedPrice;
    private TransactionType transactionType;

    @Builder
    public StockTransaction(User user, StockDetail stockDetail, Note note, Long quantity, Long tradedPrice,
                            TransactionType transactionType) {
        this.user = user;
        this.stockDetail = stockDetail;
        this.note = note;
        this.quantity = quantity;
        this.tradedPrice = tradedPrice;
        this.transactionType = transactionType;
    }

    public void update(StockTransaction stockTransaction) {
        this.stockDetail = stockTransaction.getStockDetail();
        this.note = stockTransaction.getNote();
        this.quantity = stockTransaction.getQuantity();
        this.tradedPrice = stockTransaction.getTradedPrice();
        this.transactionType = stockTransaction.getTransactionType();
    }

    public void addNote(Note note) {
        this.note = note;
    }
}
