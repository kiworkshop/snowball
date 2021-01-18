package org.kiworkshop.snowball.stocktransaction.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionCreateResponse;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StockTransactionService {

    private final StockTransactionRepository stockTransactionRepository;
    private final IAuthenticationFacade authenticationFacade;

    public StockTransactionCreateResponse create(StockTransactionRequest stockTransactionRequest) {
        User user = authenticationFacade.getUser();
        StockTransaction stockTransaction = stockTransactionRepository.save(StockTransactionAssembler.getStockTransaction(stockTransactionRequest, user));
        return StockTransactionAssembler.getStockTransactionCreateResponse(stockTransaction);
    }

    public StockTransaction get(Long id) {
        return getStockTransaction(id);
    }

    private StockTransaction getStockTransaction(Long id) {
        return stockTransactionRepository.findById(id).orElseThrow(() -> new DomainServiceException(id + "번의 StockTransaction을 찾을 수 없습니다."));
    }

    public void update(Long id, StockTransactionRequest stockTransactionRequest) {
        User user = authenticationFacade.getUser();
        StockTransaction stockTransaction = getStockTransaction(id);
        stockTransaction.update(StockTransactionAssembler.getStockTransaction(stockTransactionRequest, user));
    }

    public void delete(Long id) {
        stockTransactionRepository.deleteById(id);
    }
}
