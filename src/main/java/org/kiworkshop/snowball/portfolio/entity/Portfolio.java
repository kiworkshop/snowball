package org.kiworkshop.snowball.portfolio.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.common.entity.BaseTimeEntity;
import org.kiworkshop.snowball.holding.entity.Holding;
import org.kiworkshop.snowball.user.entity.User;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Portfolio extends BaseTimeEntity {

    @OneToMany
    private List<Holding> holdings;
    @OneToOne
    private User user;

//    @ElementCollection
//    @CollectionTable(name = "holding_stocks", joinColumns = @JoinColumn(name = "id"))
//    private List<HoldingStock> holdingStocks;
//
//    //총투자금액
//    //전체수익률
//
//    public void createHoldingStock(){
//        HoldingStock holdingStock = holdingStocks.get();
//
//    }
}
