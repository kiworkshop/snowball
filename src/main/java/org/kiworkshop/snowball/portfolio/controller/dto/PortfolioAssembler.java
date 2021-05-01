package org.kiworkshop.snowball.portfolio.controller.dto;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.portfolio.PortfolioItem;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfolioAssembler {

    public static PortfolioItemResponse getPortfolioItemResponse(PortfolioItem portfolioItem) {
        return PortfolioItemResponse.builder()
                .companyName(portfolioItem.getCompanyName())
                .averageBuyingPrice(portfolioItem.getAverageBuyingPrice())
                .earningsRate(portfolioItem.getEarningsRate())
                .targetPrice(portfolioItem.getTargetPrice())
                .targetEarningsRate(portfolioItem.getTargetEarningsRate())
                .build();
    }

    public static PortfolioDetailStockResponse getPortfolioDetailStockResponse(PortfolioItem portfolioItem) {
        // TODO: 2021/04/21 총 보유 주식 수, 총 매수 금액을 구하는 부분을 개발해야함 
        return PortfolioDetailStockResponse.builder()
                .companyName(portfolioItem.getCompanyName())
                .averageBuyingPrice(portfolioItem.getAverageBuyingPrice())
                .holdingQuantity(1)
                .purchaseAmount( portfolioItem.getAverageBuyingPrice().intValue() * 1)
                .build();
    }
}
