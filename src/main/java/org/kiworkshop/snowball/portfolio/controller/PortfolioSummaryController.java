package org.kiworkshop.snowball.portfolio.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponseDto;
import org.kiworkshop.snowball.portfolio.service.PortfolioSummaryService;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PortfolioSummaryController {

    private final PortfolioSummaryService portfolioSummaryService;

    @GetMapping("/portfolio-summary")
    public List<PortfolioStockResponseDto> getPortfolioSummary(User user) {
        return portfolioSummaryService.getPortfolioSummary(user.getId());
    }
}
