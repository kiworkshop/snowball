package org.kiworkshop.snowball.stockdetail.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StockDetailResponseDto {
    private Long id;

    @Builder
    public StockDetailResponseDto(Long id) {
        this.id = id;
    }
}
