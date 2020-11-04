package org.kiworkshop.snowball.stocktransaction.dto;

import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;

import java.util.List;
import java.util.stream.Collectors;

public class StockTransactionAssembler {
    public static StockTransaction getStockTransaction(StockTransactionRequestDto stockTransactionRequestDto) {
        return StockTransaction.builder()
                .note(stockTransactionRequestDto.getNote())
                .quantity(stockTransactionRequestDto.getQuantity())
                .stockDetail(stockTransactionRequestDto.getStockDetail())
                .tradedPrice(stockTransactionRequestDto.getTradedPrice())
                .transactionType(stockTransactionRequestDto.getTransactionType())
                .user(stockTransactionRequestDto.getUser())
                .build();
    }

    public static StockTransactionCreateResponseDto getStockTransactionCreateResponseDto(StockTransaction stockTransaction) {
        return StockTransactionCreateResponseDto.builder().id(stockTransaction.getId()).build();
    }
}
