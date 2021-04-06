package org.kiworkshop.snowball.portfolio.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PortfolioDetailStockResponse {

    private String companyName;
    private double averageBuyingPrice;
    private int holdingQuantity;
    private int purchaseAmount;

    @Builder
    public PortfolioDetailStockResponse(String companyName, double averageBuyingPrice, int holdingQuantity, int purchaseAmount) {
        this.companyName = companyName;
        this.averageBuyingPrice = averageBuyingPrice;
        this.holdingQuantity = holdingQuantity;
        this.purchaseAmount = purchaseAmount;
    }
}
