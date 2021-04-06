package org.kiworkshop.snowball.portfolio;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.portfolio.util.ProfitCalculator;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;

import javax.annotation.PostConstruct;
import java.util.List;

@Getter
@NoArgsConstructor
public class PortfolioItem {

    private StockDetail stockDetail;
    private List<StockTransaction> stockTransactionList;

    private String companyName;
    private Long averageBuyingPrice;
    private Long targetPrice;
    private double earningsRate;
    private double targetEarningsRate;

    @Builder
    public PortfolioItem(StockDetail stockDetail, List<StockTransaction> stockTransactionList, String companyName, Long averageBuyingPrice, Long targetPrice, double earningsRate, double targetEarningsRate) {
        this.stockDetail = stockDetail;
        this.stockTransactionList = stockTransactionList;
        this.companyName = companyName;
        this.averageBuyingPrice = averageBuyingPrice;
        this.targetPrice = targetPrice;
        this.earningsRate = earningsRate;
        this.targetEarningsRate = targetEarningsRate;
    }
}
