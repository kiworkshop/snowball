package org.kiworkshop.snowball.stockdetail.controller.dto;

public class StockDetailResponseFixture {

    public static StockDetailResponse create() {
        return StockDetailResponse.builder()
                .id(1L)
                .companyName("삼성전자")
                .build();
    }
}
