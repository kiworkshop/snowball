package org.kiworkshop.snowball.portfolio.controller.dto;

import java.util.ArrayList;
import java.util.List;

public class PortfolioStockResponseFixture {
    public static PortfolioItemResponse create(){
        return PortfolioItemResponse.builder()
                .companyName("삼성전자")
                .averageBuyingPrice(1000.0)
                .targetPrice(2000.0)
                .earningsRate(10.0)
                .targetEarningsRate(10.0)
                .build();
    }

    public static List<PortfolioItemResponse> createList() {
        List<PortfolioItemResponse> portfolioItemResponse = new ArrayList<>();
        portfolioItemResponse.add(PortfolioStockResponseFixture.create());
        return portfolioItemResponse;
    }
}
