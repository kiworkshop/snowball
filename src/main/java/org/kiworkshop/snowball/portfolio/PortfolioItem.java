package org.kiworkshop.snowball.portfolio;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.portfolio.util.ProfitCalculator;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;

import java.util.List;

@Getter
@NoArgsConstructor
public class PortfolioItem {

    private StockDetail stockDetail;
    private List<StockTransaction> stockTransactions;

    private String companyName;
    private Double averageBuyingPrice;
    private Double targetPrice;
    private Double earningsRate;
    private Double targetEarningsRate;

    @Builder
    public PortfolioItem(StockDetail stockDetail, List<StockTransaction> stockTransactions) {
        this.stockDetail = stockDetail;
        this.stockTransactions = stockTransactions;
        this.companyName = stockDetail.getCompanyName();
        this.targetPrice = 0.0;
        this.targetEarningsRate = 0.0;
        calculateProfit();
    }

    public void calculateProfit() {
        this.averageBuyingPrice = calculateAverageBuyingPrice();
        this.earningsRate = calculateEarningsRate();
    }

    public Double calculateAverageBuyingPrice() {
        return ProfitCalculator.getAverageBuyingPrice(this.stockTransactions);
    }

    public Double calculateEarningsRate() {
        return ProfitCalculator.getEarningsRate(this.averageBuyingPrice, this.averageBuyingPrice);
    }
}
