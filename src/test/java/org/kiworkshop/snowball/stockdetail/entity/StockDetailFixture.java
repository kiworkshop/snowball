package org.kiworkshop.snowball.stockdetail.entity;

import org.kiworkshop.snowball.common.type.MarketType;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class StockDetailFixture {

    public static StockDetail create() {
        StockDetail stockDetail = StockDetail.builder()
                .companyName("빅히트")
                .itemCode("352820")
                .category("오디오물 출판 및 원판 녹음업")
                .mainProduct("음악 기획/제작, 퍼블리싱, 아티스트 매니지먼트")
                .listingDate(LocalDate.of(2020,10,15))
                .representative("방시혁")
                .settlementMonth("12월")
                .marketType(MarketType.KOSPI)
                .build();
        ReflectionTestUtils.setField(stockDetail, "id", 1L);
        ReflectionTestUtils.setField(stockDetail, "createdDate", LocalDateTime.now());
        ReflectionTestUtils.setField(stockDetail, "modifiedDate", LocalDateTime.now());

        return stockDetail;
    }

}
