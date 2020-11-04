package org.kiworkshop.snowball.stocktransaction.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.common.type.TransactionType;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionFixture;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionRequestDto;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionRequestDtoFixture;
import org.kiworkshop.snowball.stocktransaction.dto.StockTransactionCreateResponseDto;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransaction;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
class StockTransactionServiceTest {

    @Mock
    private StockTransactionRepository stockTransactionRepository;
    @InjectMocks
    private StockTransactionService dut;

    @Test
    void create() {
        //given
        StockTransactionRequestDto stockTransactionRequestDto = StockTransactionRequestDtoFixture.create();
        StockTransaction stockTransaction = StockTransactionFixture.create(TransactionType.BUY);
        given(stockTransactionRepository.save(any())).willReturn(stockTransaction);
        //when
        StockTransactionCreateResponseDto stockTransactionCreateResponseDto = dut.create(stockTransactionRequestDto);
        //then
        assertThat(stockTransactionCreateResponseDto.getId()).isEqualTo(1L);
        then(stockTransactionRepository).should().save(any());
    }

    @Test
    void updateStockTransaction () {
        // given
        StockTransaction stockTransaction = StockTransactionFixture.create(TransactionType.BUY);
        StockTransactionRequestDto requestDto = StockTransactionRequestDtoFixture.create();
        given(stockTransactionRepository.findById(anyLong())).willReturn(Optional.of(stockTransaction));

        // when
        dut.update(stockTransaction.getId(), requestDto);

        // then
        assertThat(stockTransaction.getQuantity()).isEqualTo(requestDto.getQuantity());
        assertThat(stockTransaction.getTransactionType()).isEqualTo(requestDto.getTransactionType());
    }
}