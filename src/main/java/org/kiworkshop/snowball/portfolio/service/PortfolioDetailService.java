package org.kiworkshop.snowball.portfolio.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.portfolio.PortfolioItem;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioAssembler;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioDetailResponse;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.service.StockTransactionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.kiworkshop.snowball.portfolio.service.PortfolioSummaryService.createPortfolioItems;

@RequiredArgsConstructor
@Service
public class PortfolioDetailService {
    private final StockTransactionService stockTransactionService;

    public PortfolioDetailResponse getPortfolioDetail() {
        List<StockTransaction> stockTransactions = stockTransactionService.getStockTransactions();
        List<PortfolioItem> portfolioItems = createPortfolioItems(stockTransactions);
        return PortfolioDetailResponse
                .builder()
                .portfolioDetailStocks(
                        portfolioItems.stream()
                                .map(PortfolioAssembler::getPortfolioDetailStockResponse)
                                .collect(Collectors.toList())
                )
                .build();
    }
}
