package org.kiworkshop.snowball.stocktransaction.entity;

import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailFixture;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class StockTransactionFixture {

    public static StockTransaction create(TransactionType type){
        StockTransaction stockTransaction = StockTransaction.builder()
                .quantity(1L)
                .tradedPrice(1000L)
                .transactionType(type)
                .stockDetail(StockDetailFixture.create())
                .build();
        ReflectionTestUtils.setField(stockTransaction, "createdDate", LocalDateTime.now());
        ReflectionTestUtils.setField(stockTransaction, "modifiedDate", LocalDateTime.now());
        return stockTransaction;
    }
    public static List<StockTransaction> createList(){
        List<StockTransaction> stockTransactions = new ArrayList<>();
        stockTransactions.add(StockTransactionFixture.create(TransactionType.BUY));
        stockTransactions.add(StockTransactionFixture.create(TransactionType.BUY));
        stockTransactions.add(StockTransactionFixture.create(TransactionType.SELL));
        return stockTransactions;
    }
}
