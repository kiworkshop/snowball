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
    // TODO: 2021-01-17(017) 처음부터 company name만을 받는 것은 어떨까? 혹은 id만 받는 것은?
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