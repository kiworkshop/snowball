package org.kiworkshop.snowball.stocktransaction.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {
}
