package org.kiworkshop.snowball.portfolio.util;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

class ProfitCalculatorTest {

    @Test
    void getItemStatus() {
    }

    @Test
    void getAverageBuyingPriceTest() {
        // given
        List<StockTransaction> stockTransactions = StockTransactionFixture.createList();
        Map<StockDetail, List<StockTransaction>> stockTransactionGroups = stockTransactions
                .stream().collect(Collectors.groupingBy(StockTransaction::getStockDetail));
        Set<Map.Entry<StockDetail, List<StockTransaction>>> entrySet = stockTransactionGroups.entrySet();

        // when
    }

    @Test
    void getEarningRate() {
    }

    @Test
    void getCurrentPrice() {
    }
}