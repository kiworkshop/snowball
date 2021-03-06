package org.kiworkshop.snowball.stocktransaction.controller.dto;

import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailResponseFixture;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionResponse;

import java.util.ArrayList;
import java.util.List;

public class StockTransactionResponseFixture {

    public static List<StockTransactionResponse> createList() {
        List<StockTransactionResponse> responses = new ArrayList<>();
        responses.add(create());
        responses.add(create());
        return responses;
    }

    private static StockTransactionResponse create() {
        return StockTransactionResponse.builder()
                .stockDetailResponse(StockDetailResponseFixture.create())
                .quantity(10L)
                .tradedPrice(1000L)
                .transactionType(TransactionType.BUY)
                .build();
    }
}
