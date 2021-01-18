package org.kiworkshop.snowball.portfolio.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponse;
import org.kiworkshop.snowball.portfolio.service.PortfolioSummaryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PortfolioSummaryController {

    private final PortfolioSummaryService portfolioSummaryService;

    @GetMapping("/portfolio-summary")
    public List<PortfolioStockResponse> getPortfolioSummary() {
        return portfolioSummaryService.getPortfolioSummary();
    }
}
