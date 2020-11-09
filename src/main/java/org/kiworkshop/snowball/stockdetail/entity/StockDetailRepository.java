package org.kiworkshop.snowball.stockdetail.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StockDetailRepository extends JpaRepository<StockDetail, Long> {
    StockDetail findByCompanyName(String companyName);
}
