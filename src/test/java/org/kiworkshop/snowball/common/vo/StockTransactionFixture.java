package org.kiworkshop.snowball.common.vo;

import org.kiworkshop.snowball.common.type.TransactionType;

import java.util.ArrayList;
import java.util.List;

public class StockTransactionFixture {

    private static int id;

    public static StockTransaction create(TransactionType type){
        id++;
        return StockTransaction.builder()
                .itemCode(String.valueOf(id))
                .itemName("kiworkshop")
                .quantity(1L)
                .tradedPrice(1000L)
                .transactionType(type)
                .build();
    }
    public static List<StockTransaction> createList(){
        List<StockTransaction> stockTransactions = new ArrayList<>();
        stockTransactions.add(StockTransactionFixture.create(TransactionType.BUY));
        stockTransactions.add(StockTransactionFixture.create(TransactionType.SELL));
        return stockTransactions;
    }
}
