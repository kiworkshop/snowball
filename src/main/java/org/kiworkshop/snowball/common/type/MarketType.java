package org.kiworkshop.snowball.common.type;

public enum  MarketType {
    KOSPI("KOSPI"),
    KOSDAQ("KOSDAQ");

    private String type;

    MarketType(String type) {
        this.type = type;
    }
}
