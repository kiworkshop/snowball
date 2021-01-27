package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.PositiveOrZero;

@Getter
@NoArgsConstructor
public class NotePageRequest {

    private static final int MAX_PAGE = 10;
    private static final int MAX_SIZE = 10;

    @PositiveOrZero
    private int page;
    @PositiveOrZero
    private int size;

    @Builder
    public NotePageRequest(int page, int size) {
        if (page > MAX_PAGE) {
            throw new IllegalArgumentException("페이지 인덱스는 " + MAX_PAGE + "을(를) 초과할 수 없습니다.");
        }
        if (size > MAX_SIZE) {
            throw new IllegalArgumentException("페이지 사이즈는 " + MAX_SIZE + "을(를) 초과할 수 없습니다.");
        }

        this.page = page;
        this.size = size;
    }
}



