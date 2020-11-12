package org.kiworkshop.snowball.stocktransaction.dto;

import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.note.entity.NoteFixture;
import org.kiworkshop.snowball.user.Entity.UserFixture;

public class StockTransactionRequestDtoFixture {
    public static StockTransactionRequestDto create() {
        return StockTransactionRequestDto.builder()
                .note(NoteFixture.create())
                .user(UserFixture.create())
                .quantity(10L)
                .stockDetail(new StockDetail())
                .tradedPrice(1000L)
                .transactionType(TransactionType.BUY)
                .build();
    }
}
