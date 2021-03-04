package org.kiworkshop.snowball.note.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.YearMonth;

@ToString
@Getter
@NoArgsConstructor
public class YearMonthRequest {

    @DateTimeFormat(pattern = "yyyy-MM")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM", timezone = "Asia/Seoul")
    private YearMonth yearMonth;

    @Builder
    public YearMonthRequest(YearMonth yearMonth) {
        this.yearMonth = yearMonth;
    }
}