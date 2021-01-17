package org.kiworkshop.snowball.stocktransaction.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class StockTransactionCreateResponse {

    private Long id;

    @Builder
    public StockTransactionCreateResponse(Long id) {
        this.id = id;
    }
}
