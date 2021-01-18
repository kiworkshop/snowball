package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailAssembler;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
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
                .stockDetailResponse(StockDetailAssembler.getStockDetailResponse(stockTransaction.getStockDetail()))
                .quantity(stockTransaction.getQuantity())
                .tradedPrice(stockTransaction.getTradedPrice())
                .transactionType(stockTransaction.getTransactionType())
                .build();
    }
}
