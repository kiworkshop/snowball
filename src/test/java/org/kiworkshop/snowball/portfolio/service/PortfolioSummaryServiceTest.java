package org.kiworkshop.snowball.portfolio.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponseDto;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class PortfolioSummaryServiceTest {

    @InjectMocks
    private PortfolioSummaryService portfolioSummaryService;

    @Mock
    private StockTransactionRepository stockTransactionRepository;

    @Test
    void getPortfolioSummary() {
        // given
        Long userId = 1L;
        List<StockTransaction> stockTransactions = StockTransactionFixture.createList();
        given(stockTransactionRepository.findByUserId(anyLong())).willReturn(stockTransactions);

        // when
        List<PortfolioStockResponseDto> portfolioSummary = portfolioSummaryService.getPortfolioSummary(userId);

        // then
        PortfolioStockResponseDto portfolioStockResponseDto = portfolioSummary.get(0);
        assertThat(portfolioSummary.size()).isEqualTo(1);
        assertThat(portfolioStockResponseDto.getCompanyName()).isEqualTo("빅히트");
        assertThat(portfolioStockResponseDto.getAverageBuyingPrice()).isEqualTo(1000);
        assertThat(portfolioStockResponseDto.getEarningsRate()).isEqualTo(0.0);
        // TODO: 어떤 엔티티가 아래값들을 들고 있을지 결정하기
        assertThat(portfolioStockResponseDto.getTargetPrice()).isEqualTo(0);
        assertThat(portfolioStockResponseDto.getTargetEarningsRate()).isEqualTo(0);
    }
}
