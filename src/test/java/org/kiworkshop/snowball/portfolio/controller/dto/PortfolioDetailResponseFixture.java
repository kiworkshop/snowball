package org.kiworkshop.snowball.portfolio.controller.dto;

import java.util.ArrayList;
import java.util.List;

public class PortfolioDetailResponseFixture {

    public static PortfolioDetailResponse create() {
        return PortfolioDetailResponse.builder()
                .portfolioDetailStocks(createStocks())
                .build();
    }

    public static List<PortfolioDetailStockResponse> createStocks() {
        PortfolioDetailStockResponse stock1 = PortfolioDetailStockResponse.builder()
                .companyName("삼성전자")
                .averageBuyingPrice(80000)
                .holdingQuantity(10)
                .purchaseAmount(800000)
                .build();

        PortfolioDetailStockResponse stock2 = PortfolioDetailStockResponse.builder()
                .companyName("SK하이닉스")
                .averageBuyingPrice(140000)
                .holdingQuantity(5)
                .purchaseAmount(700000)
                .build();


        List<PortfolioDetailStockResponse> stocks = new ArrayList<>();
        stocks.add(stock1);
        stocks.add(stock2);
        return stocks;
    }
}
