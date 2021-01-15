package org.kiworkshop.snowball.stocktransaction.controller.dto;

import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class StockTransactionAssembler {

    public static List<StockTransaction> getStockTransactions(List<StockTransactionRequest> stockTransactionRequests, User user) {
        return stockTransactionRequests.stream()
                .map(stockTransactionRequest -> getStockTransaction(stockTransactionRequest, user))
                .collect(Collectors.toList());
    }

    public static StockTransaction getStockTransaction(StockTransactionRequest stockTransactionRequest, User user) {
        return StockTransaction.builder()
                .note(stockTransactionRequest.getNote())
                .quantity(stockTransactionRequest.getQuantity())
                .stockDetail(stockTransactionRequest.getStockDetail())
                .tradedPrice(stockTransactionRequest.getTradedPrice())
                .transactionType(stockTransactionRequest.getTransactionType())
                .user(user)
                .build();
    }

    public static StockTransactionCreateResponse getStockTransactionCreateResponse(StockTransaction stockTransaction) {
        return StockTransactionCreateResponse.builder().id(stockTransaction.getId()).build();
    }

    public static List<StockTransactionResponse> getStockTransactionResponses(List<StockTransaction> stockTransactions) {
        return stockTransactions.stream()
                .map(StockTransactionAssembler::getStockTransactionResponse)
                .collect(Collectors.toList());
    }

    public static StockTransactionResponse getStockTransactionResponse(StockTransaction stockTransaction) {
        return StockTransactionResponse.builder()
                .stockDetail(stockTransaction.getStockDetail())
                .quantity(stockTransaction.getQuantity())
                .tradedPrice(stockTransaction.getTradedPrice())
                .transactionType(stockTransaction.getTransactionType())
                .build();
    }
}
