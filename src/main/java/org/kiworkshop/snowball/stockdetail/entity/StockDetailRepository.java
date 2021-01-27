package org.kiworkshop.snowball.stockdetail.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockDetailRepository extends JpaRepository<StockDetail, Long> {

    Optional<StockDetail> findByCompanyName(String companyName);
}
