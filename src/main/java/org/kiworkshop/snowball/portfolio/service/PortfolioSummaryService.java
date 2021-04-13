package org.kiworkshop.snowball.portfolio.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.portfolio.PortfolioItem;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioAssembler;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioItemResponse;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.service.StockTransactionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PortfolioSummaryService {

    private final StockTransactionService stockTransactionService;

    public List<PortfolioItemResponse> getPortfolioSummary() {
        List<StockTransaction> stockTransactions = stockTransactionService.getStockTransactions();
        List<PortfolioItem> portfolioItems = createPortfolioItems(stockTransactions);
        return portfolioItems.stream()
                .map(PortfolioAssembler::getPortfolioItemResponse)
                .collect(Collectors.toList());
    }

    public List<PortfolioItem> createPortfolioItems(List<StockTransaction> stockTransactions) {
        if (stockTransactions == null) {
            return new ArrayList<>();
        }

        List<PortfolioItem> portfolioItems = new ArrayList<>();
        stockTransactions.stream()
                .collect(Collectors.groupingBy(StockTransaction::getStockDetail))
                .forEach((stockDetail, stockTransactionGroup)
                        -> portfolioItems.add(new PortfolioItem(stockDetail, stockTransactionGroup))
                );
        return portfolioItems;
    }
}
