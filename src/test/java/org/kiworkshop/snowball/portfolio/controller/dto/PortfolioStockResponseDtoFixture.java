package org.kiworkshop.snowball.portfolio.controller.dto;

import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponseDto;

import java.util.ArrayList;
import java.util.List;

public class PortfolioStockResponseDtoFixture {
    public static PortfolioStockResponseDto create(){
        return PortfolioStockResponseDto.builder()
                .companyName("삼성전자")
                .averageBuyingPrice(1000L)
                .targetPrice(2000L)
                .earningsRate(10)
                .targetEarningsRate(10)
                .build();
    }

    public static List<PortfolioStockResponseDto> createList() {
        List<PortfolioStockResponseDto> portfolioStockResponseDtos = new ArrayList<>();
        portfolioStockResponseDtos.add(PortfolioStockResponseDtoFixture.create());
        return portfolioStockResponseDtos;
    }
}
