package org.kiworkshop.snowball.stockdetail.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.common.type.MarketType;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
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

    @Builder
    public StockDetail(String companyName, String itemCode, String category, String mainProduct, LocalDate listingDate, String settlementMonth, String representative, MarketType marketType) {
        this.companyName = companyName;
        this.itemCode = itemCode;
        this.category = category;
        this.mainProduct = mainProduct;
        this.listingDate = listingDate;
        this.settlementMonth = settlementMonth;
        this.representative = representative;
        this.marketType = marketType;
    }
}
