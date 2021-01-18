package org.kiworkshop.snowball.portfolio.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponse;
import org.kiworkshop.snowball.portfolio.util.ProfitCalculator;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PortfolioSummaryService {

    private final StockTransactionRepository stockTransactionRepository;
    private final IAuthenticationFacade iAuthenticationFacade;

    public List<PortfolioStockResponse> getPortfolioSummary() {

        User user = iAuthenticationFacade.getUser();
        List<StockTransaction> stockTransactions = stockTransactionRepository.findByUserId(user.getId());
        Set<Map.Entry<StockDetail, List<StockTransaction>>> stockTransactionGroups = createStockTransactionGroups(stockTransactions);
        return stockTransactionGroups.stream()
                .map(ProfitCalculator::getItemStatus)
                .collect(Collectors.toList());
    }

    private Set<Map.Entry<StockDetail, List<StockTransaction>>> createStockTransactionGroups(List<StockTransaction> stockTransactions) {
        Map<StockDetail, List<StockTransaction>> stockTransactionGroups = stockTransactions
                .stream().collect(Collectors.groupingBy(StockTransaction::getStockDetail));
        return stockTransactionGroups.entrySet();
    }
}
