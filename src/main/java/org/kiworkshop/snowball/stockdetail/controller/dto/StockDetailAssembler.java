package org.kiworkshop.snowball.stockdetail.controller.dto;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StockDetailAssembler {

    public static StockDetailResponse getStockDetailResponse(StockDetail stockDetail) {
        return StockDetailResponse.builder()
                .id(stockDetail.getId())
                .build();
    }
}
