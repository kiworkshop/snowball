package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.note.entity.Note;

@Getter
@NoArgsConstructor
public class StockTransactionRequest {

    private Note note;
    private Long stockDetailId;
    private Long quantity;
    private Long tradedPrice;
    private TransactionType transactionType;

    @Builder
    public StockTransactionRequest(Note note, Long stockDetailId, Long quantity, Long tradedPrice,
                                   TransactionType transactionType) {
        this.note = note;
        this.stockDetailId = stockDetailId;
        this.quantity = quantity;
        this.tradedPrice = tradedPrice;
        this.transactionType = transactionType;
    }
}