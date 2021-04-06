package org.kiworkshop.snowball.portfolio.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.portfolio.PortfolioItem;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponse;
import org.kiworkshop.snowball.portfolio.util.ProfitCalculator;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        // TODO: 2021/04/06 PortfolioItem에서 ProfitCalculator를 의존하여 수익률을 계산하자 
        User user = iAuthenticationFacade.getUser();
        List<StockTransaction> stockTransactions = stockTransactionRepository.findByUserId(user.getId());
        List<PortfolioItem> portfolioItems = createPortfolioItems(stockTransactions);

        return null;
    }

    private List<PortfolioItem> createPortfolioItems(List<StockTransaction> stockTransactions) {
        List<PortfolioItem> portfolioItemList = new ArrayList<>();
        stockTransactions
                .stream().collect(Collectors.groupingBy(StockTransaction::getStockDetail))
                .forEach((key,value) -> portfolioItemList.add(PortfolioItem.builder().stockDetail(key).stockTransactionList(value).build()));
        return portfolioItemList;
    }
}
