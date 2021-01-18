package org.kiworkshop.snowball.portfolio.controller.dto;

import java.util.ArrayList;
import java.util.List;

public class PortfolioStockResponseDtoFixture {
    public static PortfolioStockResponse create(){
        return PortfolioStockResponse.builder()
                .companyName("삼성전자")
                .averageBuyingPrice(1000L)
                .targetPrice(2000L)
                .earningsRate(10)
                .targetEarningsRate(10)
                .build();
    }

    public static List<PortfolioStockResponse> createList() {
        List<PortfolioStockResponse> portfolioStockResponses = new ArrayList<>();
        portfolioStockResponses.add(PortfolioStockResponseDtoFixture.create());
        return portfolioStockResponses;
    }
}
