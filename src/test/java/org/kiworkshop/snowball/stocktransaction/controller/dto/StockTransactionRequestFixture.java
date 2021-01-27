package org.kiworkshop.snowball.stocktransaction.controller.dto;

import org.kiworkshop.snowball.common.type.TransactionType;

import java.util.ArrayList;
import java.util.List;

public class StockTransactionRequestFixture {

    public static StockTransactionRequest create() {
        return StockTransactionRequest.builder()
                .stockDetailId(2L)
                .quantity((long) (Math.random() * 100))
                .tradedPrice(1000L)
                .transactionType(TransactionType.BUY)
                .build();
    }

    public static List<StockTransactionRequest> createList() {
        List<StockTransactionRequest> stockTransactionRequests = new ArrayList<>();
        stockTransactionRequests.add(create());
        return stockTransactionRequests;
    }
}
