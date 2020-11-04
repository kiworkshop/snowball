package org.kiworkshop.snowball.stocktransaction.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionRequestDto;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionCreateResponseDto;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StockTransactionService {

    private final StockTransactionRepository stockTransactionRepository;

    public StockTransactionCreateResponseDto create(StockTransactionRequestDto stockTransactionRequestDto) {
        StockTransaction stockTransaction = stockTransactionRepository.save(StockTransactionAssembler.getStockTransaction(stockTransactionRequestDto));
        return StockTransactionAssembler.getStockTransactionCreateResponseDto(stockTransaction);
    }

    public void update(Long id, StockTransactionRequestDto stockTransactionRequestDto) {
        StockTransaction stockTransaction = getStockTransaction(id);
        stockTransaction.update(StockTransactionAssembler.getStockTransaction(stockTransactionRequestDto));
    }

    public StockTransaction get(Long id) {
        return getStockTransaction(id);
    }

    private StockTransaction getStockTransaction(Long id) {
        return stockTransactionRepository.findById(id).orElseThrow(() -> new DomainServiceException(id + "번의 StockTransaction을 찾을 수 없습니다."));
    }

    public void delete(Long id) {
        stockTransactionRepository.deleteById(id);
    }
}
