package org.kiworkshop.snowball.stockdetail.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailResponse;
import org.kiworkshop.snowball.stockdetail.service.StockDetailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class StockDetailController {

    private final StockDetailService stockDetailService;

    @GetMapping("/stockdetail")
    public StockDetailResponse getStockDetailByCompanyName(@RequestParam String companyName) {
        return stockDetailService.getStockDetailByCompanyName(companyName);
    }
}