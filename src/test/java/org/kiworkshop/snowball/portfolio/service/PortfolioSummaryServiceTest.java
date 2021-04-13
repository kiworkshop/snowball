package org.kiworkshop.snowball.portfolio.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.portfolio.PortfolioItem;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioItemResponse;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.stocktransaction.service.StockTransactionService;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class PortfolioSummaryServiceTest {

    @InjectMocks
    private PortfolioSummaryService dut;
    @Mock
    private StockTransactionService stockTransactionService;

    @Test
    void getPortfolioSummary() {
        // given
        List<StockTransaction> stockTransactions = StockTransactionFixture.createList();
        given(stockTransactionService.getStockTransactions()).willReturn(stockTransactions);
        // when
        List<PortfolioItemResponse> portfolioSummary = dut.getPortfolioSummary();
        // then
        PortfolioItemResponse portfolioItemResponse = portfolioSummary.get(0);
        assertThat(portfolioSummary.size()).isEqualTo(1);
        assertThat(portfolioItemResponse.getCompanyName()).isEqualTo("빅히트");
        assertThat(portfolioItemResponse.getAverageBuyingPrice()).isEqualTo(1000);
        assertThat(portfolioItemResponse.getEarningsRate()).isEqualTo(0.0);
        // TODO: 어떤 엔티티가 아래값들을 들고 있을지 결정하기
        assertThat(portfolioItemResponse.getTargetPrice()).isEqualTo(0);
        assertThat(portfolioItemResponse.getTargetEarningsRate()).isEqualTo(0);
    }

    @Test
    void createPortfolioItems() {
        //given
        List<StockTransaction> stockTransactions = StockTransactionFixture.createList();
        //when
        List<PortfolioItem> portfolioItems = dut.createPortfolioItems(stockTransactions);
        //then
        assertThat(portfolioItems.size()).isEqualTo(1);
    }
}
