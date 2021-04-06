package org.kiworkshop.snowball.portfolio.controller.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class PortfolioDetailResponse {

    private List<PortfolioDetailStockResponse> portfolioDetailStocks;

    @Builder
    public PortfolioDetailResponse(List<PortfolioDetailStockResponse> portfolioDetailStocks) {
        this.portfolioDetailStocks = portfolioDetailStocks;
    }
}
