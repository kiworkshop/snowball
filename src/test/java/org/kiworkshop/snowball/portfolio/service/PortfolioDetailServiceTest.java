package org.kiworkshop.snowball.portfolio.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioDetailResponse;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioDetailStockResponse;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.stocktransaction.service.StockTransactionService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class PortfolioDetailServiceTest {

    @InjectMocks
    private PortfolioDetailService dut;
    @Mock
    private StockTransactionService stockTransactionService;

    @Test
    void getPortfolioDetail() {
        //given
        List<StockTransaction> stockTransactionList = StockTransactionFixture.createList();
        given(stockTransactionService.getStockTransactions()).willReturn(stockTransactionList);
        //when
        PortfolioDetailResponse portfolioDetail = dut.getPortfolioDetail();
        //then
        List<PortfolioDetailStockResponse> portfolioDetailStocks = portfolioDetail.getPortfolioDetailStocks();
        assertThat(portfolioDetailStocks.size()).isEqualTo(1);
        PortfolioDetailStockResponse portfolioDetailItem1 = portfolioDetailStocks.get(0);
        assertThat(portfolioDetailItem1.getCompanyName()).isEqualTo("빅히트");
        assertThat(portfolioDetailItem1.getAverageBuyingPrice()).isEqualTo(1000);
        assertThat(portfolioDetailItem1.getHoldingQuantity()).isEqualTo(1);
        assertThat(portfolioDetailItem1.getPurchaseAmount()).isEqualTo(1000 * 1);
    }
}