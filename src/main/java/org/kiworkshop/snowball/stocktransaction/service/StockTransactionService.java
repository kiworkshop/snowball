package org.kiworkshop.snowball.stocktransaction.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionRequestDto;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionCreateResponseDto;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StockTransactionService {

    private final StockTransactionRepository stockTransactionRepository;

    public StockTransactionCreateResponseDto create(StockTransactionRequestDto stockTransactionRequestDto) {
        StockTransaction stockTransaction = stockTransactionRepository.save(StockTransactionAssembler.getStockTransaction(stockTransactionRequestDto));
        return StockTransactionAssembler.getStockTransactionCreateResponseDto(stockTransaction);
    }
}
