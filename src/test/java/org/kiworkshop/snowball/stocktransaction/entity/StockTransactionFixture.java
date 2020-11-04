package org.kiworkshop.snowball.stocktransaction.entity;

import org.kiworkshop.snowball.common.type.TransactionType;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;

public class StockTransactionFixture {

    private static long id = 0;

    public static StockTransaction create(TransactionType type){
        id++;
        StockTransaction stockTransaction = StockTransaction.builder()
                .quantity(1L)
                .tradedPrice(1000L)
                .transactionType(type)
                .build();
        ReflectionTestUtils.setField(stockTransaction, "id", id);
        return stockTransaction;
    }
    public static List<StockTransaction> createList(){
        List<StockTransaction> stockTransactions = new ArrayList<>();
        stockTransactions.add(StockTransactionFixture.create(TransactionType.BUY));
        stockTransactions.add(StockTransactionFixture.create(TransactionType.SELL));
        return stockTransactions;
    }
}
