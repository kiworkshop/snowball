package org.kiworkshop.snowball.stocktransaction.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {

    List<StockTransaction> findByUserId(@Param("user_id") Long userId);
}
