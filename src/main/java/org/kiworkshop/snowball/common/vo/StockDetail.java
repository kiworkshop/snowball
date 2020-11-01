package org.kiworkshop.snowball.common.vo;

import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.common.type.MarketType;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Entity
public class StockDetail extends BaseTimeEntity {

    private String companyName;
    private String itemCode;
    private String category;
    private String mainProduct;
    private LocalDate listingDate;
    private String settlementMonth;
    private String representative;
    @Enumerated(EnumType.STRING)
    private MarketType marketType;
}
