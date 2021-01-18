package org.kiworkshop.snowball.portfolio.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponse;
import org.kiworkshop.snowball.portfolio.util.ProfitCalculator;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class PortfolioSummaryServiceTest {

    @InjectMocks
    private PortfolioSummaryService portfolioSummaryService;

    @Mock
    private StockTransactionRepository stockTransactionRepository;

    @Mock
    private IAuthenticationFacade iAuthenticationFacade;

    @BeforeEach
    void setUp() {
        given(iAuthenticationFacade.getUser()).willReturn(UserFixture.create());
    }

    @Test
    void getPortfolioSummary() {
        // given
        List<StockTransaction> stockTransactions = StockTransactionFixture.createList();
        given(stockTransactionRepository.findByUserId(any())).willReturn(stockTransactions);

        // when
        List<PortfolioStockResponse> portfolioSummary = portfolioSummaryService.getPortfolioSummary();

        // then
        PortfolioStockResponse portfolioStockResponse = portfolioSummary.get(0);
        assertThat(portfolioSummary.size()).isEqualTo(1);
        assertThat(portfolioStockResponse.getCompanyName()).isEqualTo("빅히트");
        assertThat(portfolioStockResponse.getAverageBuyingPrice()).isEqualTo(1000);
        assertThat(portfolioStockResponse.getEarningsRate()).isEqualTo(0.0);
        // TODO: 어떤 엔티티가 아래값들을 들고 있을지 결정하기
        assertThat(portfolioStockResponse.getTargetPrice()).isEqualTo(0);
        assertThat(portfolioStockResponse.getTargetEarningsRate()).isEqualTo(0);
    }
}
