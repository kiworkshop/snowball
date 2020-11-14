package org.kiworkshop.snowball.stockdetail.controller;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailResponseDto;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class StockDetailController {

    private final StockDetailRepository stockDetailRepository;

    @GetMapping("/stockdetails")
    public Page<StockDetail> getStockDetails(Pageable pageRequest) {
        return stockDetailRepository.findAll(pageRequest);
    }

    @GetMapping("/stockdetail")
    public StockDetailResponseDto getStockDetailByName(@RequestParam String companyName){
        return StockDetailResponseDto.builder().id(stockDetailRepository.findByCompanyName(companyName).getId()).build();
    }
}