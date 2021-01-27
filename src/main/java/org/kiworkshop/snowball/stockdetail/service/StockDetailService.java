package org.kiworkshop.snowball.stockdetail.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailAssembler;
import org.kiworkshop.snowball.stockdetail.controller.dto.StockDetailResponse;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StockDetailService {

    private final StockDetailRepository stockDetailRepository;

    public StockDetailResponse getStockDetailByCompanyName(String companyName) {
        StockDetail stockDetail = stockDetailRepository.findByCompanyName(companyName).orElseThrow(() ->
                new DomainServiceException(companyName + "종목의 주식 상세정보를 찾을 수 없습니다."));
        return StockDetailAssembler.getStockDetailResponse(stockDetail);
    }

    public StockDetail getStockDetail(Long id) {
        return stockDetailRepository.findById(id).orElseThrow(() ->
                new DomainServiceException(id + "번 종목의 주식 상세정보를 찾을 수 없습니다."));
    }
}
