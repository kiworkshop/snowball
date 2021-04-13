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
}
