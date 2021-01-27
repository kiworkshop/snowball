package org.kiworkshop.snowball.stocktransaction.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stockdetail.service.StockDetailService;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionCreateResponse;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StockTransactionService {

    private final StockTransactionRepository stockTransactionRepository;
    private final StockDetailService stockDetailService;
    private final IAuthenticationFacade authenticationFacade;

    public StockTransactionCreateResponse createStockTransaction(StockTransactionRequest stockTransactionRequest) {
        User user = authenticationFacade.getUser();
        StockDetail stockDetail = stockDetailService.getStockDetail(stockTransactionRequest.getStockDetailId());
        StockTransaction stockTransaction = StockTransactionAssembler.getStockTransaction(
                stockTransactionRequest, stockDetail, user);

        StockTransaction saved = stockTransactionRepository.save(stockTransaction);

        return StockTransactionAssembler.getStockTransactionCreateResponse(saved);
    }

    public List<StockTransaction> createStockTransactions(List<StockTransactionRequest> stockTransactionRequests) {
        User user = authenticationFacade.getUser();
        List<StockTransaction> stockTransactions = new ArrayList<>();

        for (StockTransactionRequest stockTransactionRequest : stockTransactionRequests) {
            StockDetail stockDetail = stockDetailService.getStockDetail(stockTransactionRequest.getStockDetailId());
            StockTransaction stockTransaction = StockTransactionAssembler.getStockTransaction(
                    stockTransactionRequest, stockDetail, user);
            stockTransactions.add(stockTransaction);
        }

        return stockTransactionRepository.saveAll(stockTransactions);
    }

    public StockTransaction getStockTransaction(Long id) {
        return stockTransactionRepository.findById(id).orElseThrow(()
                -> new DomainServiceException(id + "번의 StockTransaction을 찾을 수 없습니다."));
    }

    public void updateStockTransaction(Long id, StockTransactionRequest stockTransactionRequest) {
        User user = authenticationFacade.getUser();
        StockTransaction stockTransaction = getStockTransaction(id);
        StockDetail stockDetail = stockDetailService.getStockDetail(stockTransactionRequest.getStockDetailId());

        stockTransaction.update(StockTransactionAssembler.getStockTransaction(stockTransactionRequest, stockDetail, user));
    }

    public void deleteStockTransaction(Long id) {
        stockTransactionRepository.deleteById(id);
    }
}
