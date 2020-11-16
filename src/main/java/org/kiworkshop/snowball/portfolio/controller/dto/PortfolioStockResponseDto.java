package org.kiworkshop.snowball.portfolio.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PortfolioStockResponseDto {

    private String companyName;
    private Long averageBuyingPrice;
    private Long targetPrice;
    private double earningsRate;
    private double targetEarningsRate;

    @Builder
    public PortfolioStockResponseDto(String companyName, Long averageBuyingPrice, Long targetPrice, double earningsRate, double targetEarningsRate) {
        this.companyName = companyName;
        this.averageBuyingPrice = averageBuyingPrice;
        this.targetPrice = targetPrice;
        this.earningsRate = earningsRate;
        this.targetEarningsRate = targetEarningsRate;
    }
}
