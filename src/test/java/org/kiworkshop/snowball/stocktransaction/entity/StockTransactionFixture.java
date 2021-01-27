package org.kiworkshop.snowball.stocktransaction.entity;

import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.note.controller.dto.NoteRequest;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestFixture;
import org.kiworkshop.snowball.note.entity.NoteFixture;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailFixture;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionAssembler;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequestFixture;
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
        stockTransactions.add(create(TransactionType.BUY));
        stockTransactions.add(create(TransactionType.BUY));
        stockTransactions.add(create(TransactionType.SELL));
        return stockTransactions;
    }

    public static List<StockTransaction> createUpdateList(NoteRequest updateRequest) {
        List<StockTransaction> stockTransactions = new ArrayList<>();
        List<StockTransactionRequest> stockTransactionRequests = updateRequest.getStockTransactionRequests();

        for (StockTransactionRequest stockTransactionRequest : stockTransactionRequests) {
            StockDetail stockDetail = StockDetailFixture.createWithId(stockTransactionRequest.getStockDetailId());
            StockTransaction stockTransaction = StockTransactionAssembler.getStockTransaction(
                    stockTransactionRequest, stockDetail, null);
            stockTransactions.add(stockTransaction);
        }

        return stockTransactions;
    }
}
