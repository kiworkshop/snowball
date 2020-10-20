package org.kiworkshop.snowball.common.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.type.TransactionType;

import javax.persistence.Embeddable;

@Getter
@Embeddable
@NoArgsConstructor
public class StockTransaction {

    private String itemCode;
    private String itemName;
    private Long tradedPrice;
    private Long quantity;
    private TransactionType transactionType;

    @Builder
    public StockTransaction(String itemCode, String itemName, Long tradedPrice, Long quantity, TransactionType transactionType) {
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.tradedPrice = tradedPrice;
        this.quantity = quantity;
        this.transactionType = transactionType;
    }
}
