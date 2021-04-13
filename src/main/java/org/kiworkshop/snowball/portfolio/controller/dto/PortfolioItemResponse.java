package org.kiworkshop.snowball.portfolio.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PortfolioItemResponse {

    private String companyName;
    private Double averageBuyingPrice;
    private Double targetPrice;
    private Double earningsRate;
    private Double targetEarningsRate;

    @Builder
    public PortfolioItemResponse(String companyName, Double averageBuyingPrice, Double targetPrice, Double earningsRate, Double targetEarningsRate) {
        this.companyName = companyName;
        this.averageBuyingPrice = averageBuyingPrice;
        this.targetPrice = targetPrice;
        this.earningsRate = earningsRate;
        this.targetEarningsRate = targetEarningsRate;
    }
}
