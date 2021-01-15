package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.Builder;
import lombok.Getter;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;

@Getter
public class StockTransactionResponse {

    private StockDetail stockDetail;
    private Long quantity;
    private Long tradedPrice;
    private TransactionType transactionType;

    @Builder
    public StockTransactionResponse(StockDetail stockDetail, Long quantity, Long tradedPrice, TransactionType transactionType) {
        this.stockDetail = stockDetail;
        this.quantity = quantity;
        this.tradedPrice = tradedPrice;
        this.transactionType = transactionType;
    }
}
