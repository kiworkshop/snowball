package org.kiworkshop.snowball.holding.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.common.exception.DomainException;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.common.vo.StockTransaction;
import org.kiworkshop.snowball.user.entity.User;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Getter
@Entity
@NoArgsConstructor
public class Holding extends BaseTimeEntity {

    private String itemCode;
    private String itemName;
    private Long averagePurchasePrice;
    private Long quantity;
    @ManyToOne
    private User user;

    @Builder
    public Holding(String itemCode, String itemName, Long averagePurchasePrice, Long quantity, User user) {
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.averagePurchasePrice = averagePurchasePrice;
        this.quantity = quantity;
        this.user = user;
    }

    public void execute(StockTransaction stockTransaction) throws DomainException {
        assert(stockTransaction.getItemCode()).equals(this.itemCode);
        assert(stockTransaction.getItemName()).equals(this.itemName);
//        assert(stockTransaction.getTransactionType()).isNotNull;
        if(stockTransaction.getTransactionType().equals(TransactionType.SELL)){
            sell(stockTransaction);
        }
        buy(stockTransaction);
    }

    private void buy(StockTransaction stockTransaction) {
        long addedPrice = stockTransaction.getQuantity() * stockTransaction.getTradedPrice();
        long totalQuantity = this.quantity + stockTransaction.getQuantity();
        long totalPurchasePrice = averagePurchasePrice * quantity + addedPrice;
        this.averagePurchasePrice = totalPurchasePrice / totalQuantity;
        this.quantity = totalQuantity;
    }

    private void sell(StockTransaction stockTransaction) throws DomainException {
        if(stockTransaction.getQuantity() > this.quantity) {
            throw new DomainException("");
        }
        this.quantity -= stockTransaction.getQuantity();
    }
}
