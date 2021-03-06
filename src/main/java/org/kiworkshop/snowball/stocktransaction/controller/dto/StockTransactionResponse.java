package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.Builder;
import lombok.Getter;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailResponse;

@Getter
public class StockTransactionResponse {

    private StockDetailResponse stockDetail;
    private Long quantity;
    private Long tradedPrice;
    private TransactionType transactionType;

    @Builder
    public StockTransactionResponse(StockDetailResponse stockDetailResponse, Long quantity, Long tradedPrice, TransactionType transactionType) {
        this.stockDetail = stockDetailResponse;
        this.quantity = quantity;
        this.tradedPrice = tradedPrice;
        this.transactionType = transactionType;
    }
}
