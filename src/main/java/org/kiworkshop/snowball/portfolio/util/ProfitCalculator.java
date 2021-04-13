package org.kiworkshop.snowball.portfolio.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ProfitCalculator {

    public static Double getAverageBuyingPrice(List<StockTransaction> stockTransactions) {
        return stockTransactions.stream()
                .filter(stockTransaction -> stockTransaction.getTransactionType().equals(TransactionType.BUY))
                .mapToInt(stockTransaction -> Math.toIntExact(stockTransaction.getTradedPrice()))
                .average().orElseThrow();
    }

    public static double getEarningsRate(Double averageBuyingPrice, Double currentPrice) {
        return (currentPrice - averageBuyingPrice) / averageBuyingPrice;
    }
}
