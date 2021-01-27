package org.kiworkshop.snowball.stocktransaction.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.auth.IAuthenticationFacade;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailFixture;
import org.kiworkshop.snowball.stockdetail.service.StockDetailService;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequest;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionRequestFixture;
import org.kiworkshop.snowball.stocktransaction.controller.dto.StockTransactionCreateResponse;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StockTransactionServiceTest {

    @InjectMocks
    private StockTransactionService dut;
    @Mock
    private StockTransactionRepository stockTransactionRepository;
    @Mock
    private StockDetailService stockDetailService;
    @Mock
    private IAuthenticationFacade authenticationFacade;

    @Test
    void getStockTransaction() {
        //given
        StockTransaction ret = StockTransactionFixture.create(TransactionType.BUY);
        given(stockTransactionRepository.findById(anyLong())).willReturn(Optional.of(ret));

        //when
        StockTransaction stockTransaction = dut.getStockTransaction(1L);

        //then
        assertThat(stockTransaction).isEqualToComparingFieldByField(ret);
        then(stockTransactionRepository).should().findById(anyLong());
    }

    @Test
    void createStockTransaction() {
        //given
        StockTransactionRequest stockTransactionRequest = StockTransactionRequestFixture.create();
        StockTransaction stockTransaction = StockTransactionFixture.create(TransactionType.BUY);

        given(authenticationFacade.getUser()).willReturn(UserFixture.create());
        given(stockDetailService.getStockDetail(anyLong())).willReturn(StockDetailFixture.create());
        given(stockTransactionRepository.save(any(StockTransaction.class))).willReturn(stockTransaction);

        //when
        StockTransactionCreateResponse stockTransactionCreateResponse = dut.createStockTransaction(stockTransactionRequest);

        //then
        assertThat(stockTransactionCreateResponse.getId()).isEqualTo(stockTransaction.getId());
        then(stockTransactionRepository).should().save(any());
    }

    @Test
    void updateStockTransaction () {
        // given
        StockTransaction stockTransaction = StockTransactionFixture.create(TransactionType.BUY);
        StockTransactionRequest requestDto = StockTransactionRequestFixture.create();
        Long stockTransactionId = 1L;

        given(stockTransactionRepository.findById(stockTransactionId)).willReturn(Optional.of(stockTransaction));
        given(authenticationFacade.getUser()).willReturn(UserFixture.create());

        // when
        dut.updateStockTransaction(stockTransactionId, requestDto);

        // then
        assertThat(stockTransaction.getQuantity()).isEqualTo(requestDto.getQuantity());
        assertThat(stockTransaction.getTransactionType()).isEqualTo(requestDto.getTransactionType());
    }

    @Test
    void deleteStockTransaction() {
        //when
        dut.deleteStockTransaction(1L);

        //then
        then(stockTransactionRepository).should().deleteById(anyLong());
        verify(stockTransactionRepository).deleteById(anyLong());
    }
}