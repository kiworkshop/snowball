package org.kiworkshop.snowball.portfolio.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioDetailResponse;
import org.kiworkshop.snowball.portfolio.service.PortfolioDetailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class PortfolioDetailController {

    private final PortfolioDetailService portfolioDetailService;

    @GetMapping("/portfolio-detail")
    public PortfolioDetailResponse getPortfolioDetail() {
        return portfolioDetailService.getPortfolioDetail();
    }
}
