package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.user.entity.User;

@Getter
@NoArgsConstructor
public class StockTransactionRequest {

    private Note note;
    private StockDetail stockDetail;
    private Long quantity;
    private Long tradedPrice;
    private TransactionType transactionType;

    @Builder
    public StockTransactionRequest(Note note, Long quantity, StockDetail stockDetail, Long tradedPrice, TransactionType transactionType) {
        this.note = note;
        this.quantity = quantity;
        this.stockDetail = stockDetail;
        this.tradedPrice = tradedPrice;
        this.transactionType = transactionType;
    }
}