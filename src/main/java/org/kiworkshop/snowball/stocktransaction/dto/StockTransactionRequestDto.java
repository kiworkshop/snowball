package org.kiworkshop.snowball.stocktransaction.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.common.vo.StockDetail;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.user.entity.User;

@Getter
@NoArgsConstructor
public class StockTransactionRequestDto {
    private Note note;
    private User user;
    private Long quantity;
    private StockDetail stockDetail;
    private Long tradedPrice;
    private TransactionType transactionType;

    @Builder
    public StockTransactionRequestDto(Note note, User user, Long quantity, StockDetail stockDetail, Long tradedPrice, TransactionType transactionType) {
        this.note = note;
        this.user = user;
        this.quantity = quantity;
        this.stockDetail = stockDetail;
        this.tradedPrice = tradedPrice;
        this.transactionType = transactionType;
    }
}