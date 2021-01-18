package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.Builder;
import lombok.Getter;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailResponse;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailResponseDto;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;

@Getter
public class StockTransactionResponse {

    private StockDetailResponse stockDetailResponse;
    private Long quantity;
    private Long tradedPrice;
    private TransactionType transactionType;

    @Builder
    public StockTransactionResponse(StockDetailResponse stockDetailResponse, Long quantity, Long tradedPrice, TransactionType transactionType) {
        this.stockDetailResponse = stockDetailResponse;
        this.quantity = quantity;
        this.tradedPrice = tradedPrice;
        this.transactionType = transactionType;
    }
}
