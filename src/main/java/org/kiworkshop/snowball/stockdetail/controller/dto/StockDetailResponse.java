package org.kiworkshop.snowball.stockdetail.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StockDetailResponse {

    private Long id;
    private String CompanyName;

    @Builder
    public StockDetailResponse(Long id, String companyName) {
        this.id = id;
        CompanyName = companyName;
    }
}
