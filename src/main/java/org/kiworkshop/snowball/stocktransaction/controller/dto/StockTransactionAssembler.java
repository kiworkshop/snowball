package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailAssembler;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StockTransactionAssembler {

    public static StockTransaction getStockTransaction(StockTransactionRequest stockTransactionRequest,
                                                       StockDetail stockDetail, User user) {
        return StockTransaction.builder()
                .user(user)
                .stockDetail(stockDetail)
                .note(stockTransactionRequest.getNote())
                .quantity(stockTransactionRequest.getQuantity())
                .tradedPrice(stockTransactionRequest.getTradedPrice())
                .transactionType(stockTransactionRequest.getTransactionType())
                .build();
    }

    public static StockTransactionCreateResponse getStockTransactionCreateResponse(StockTransaction stockTransaction) {
        return StockTransactionCreateResponse.builder().id(stockTransaction.getId()).build();
    }

    public static List<StockTransactionResponse> getStockTransactionResponses(List<StockTransaction> stockTransactions) {
        if (stockTransactions == null) {
            return new ArrayList<>();
        }
        return stockTransactions.stream()
                .map(StockTransactionAssembler::getStockTransactionResponse)
                .collect(Collectors.toList());
    }

    public static StockTransactionResponse getStockTransactionResponse(StockTransaction stockTransaction) {
        return StockTransactionResponse.builder()
                .stockDetailResponse(StockDetailAssembler.getStockDetailResponse(stockTransaction.getStockDetail()))
                .quantity(stockTransaction.getQuantity())
                .tradedPrice(stockTransaction.getTradedPrice())
                .transactionType(stockTransaction.getTransactionType())
                .build();
    }
}
