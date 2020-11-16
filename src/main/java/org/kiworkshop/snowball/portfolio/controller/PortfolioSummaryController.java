package org.kiworkshop.snowball.portfolio.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponseDto;
import org.kiworkshop.snowball.portfolio.service.PortfolioSummaryService;
import org.kiworkshop.snowball.user.controller.dto.UserResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PortfolioSummaryController {

    private final PortfolioSummaryService portfolioSummaryService;

    @GetMapping("/portfolio-summary/{userId}")
    public List<PortfolioStockResponseDto> getPortfolioSummary(@PathVariable Long userId) {
        return portfolioSummaryService.getPortfolioSummary(userId);
    }
}
