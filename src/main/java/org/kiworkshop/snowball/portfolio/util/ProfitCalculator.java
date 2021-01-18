package org.kiworkshop.snowball.portfolio.util;

import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponse;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;

import java.util.List;
import java.util.Map;

public class ProfitCalculator {

    public static PortfolioStockResponse getItemStatus(Map.Entry<StockDetail, List<StockTransaction>> stockTransactionGroup) {
        long averageBuyingPrice = getAverageBuyingPrice(stockTransactionGroup);
        return PortfolioStockResponse.builder()
                .companyName(stockTransactionGroup.getKey().getCompanyName())
                .averageBuyingPrice(averageBuyingPrice)
                .earningsRate(getEarningRate(averageBuyingPrice, getCurrentPrice(stockTransactionGroup.getKey())))
                .targetPrice(0L)
                .targetEarningsRate(0L)
                .build();
    }

    private static double getEarningRate(double averageBuyingPrice, Long currentPrice) {
        return (currentPrice - averageBuyingPrice) / averageBuyingPrice;
    }

    private static Long getCurrentPrice(StockDetail stockDetail) {
        return 1000L;
    }

    private static long getAverageBuyingPrice(Map.Entry<StockDetail, List<StockTransaction>> stockTransactionGroup) {
        return (long) stockTransactionGroup.getValue().stream()
                .filter(stockTransaction -> stockTransaction.getTransactionType().equals(TransactionType.BUY))
                .mapToInt(stockTransaction -> Math.toIntExact(stockTransaction.getTradedPrice()))
                .average().orElseThrow();
    }

}
