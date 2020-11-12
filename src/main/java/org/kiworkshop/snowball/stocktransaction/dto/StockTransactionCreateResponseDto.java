package org.kiworkshop.snowball.stocktransaction.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StockTransactionCreateResponseDto {
    private Long id;

    @Builder
    public StockTransactionCreateResponseDto(Long id) {
        this.id = id;
    }
}
