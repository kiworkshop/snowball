package org.kiworkshop.snowball.note.controller.dto;

import lombok.Builder;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class NotePageRequest extends PageRequest {

    private static final Sort SORT_BY_CREATED_DATE = Sort.by("createdDate").descending();
    private static final int MAX_PAGE = 11;
    private static final int MAX_SIZE = 11;

    @Builder
    public NotePageRequest(int page, int size, Sort sort) {
        super(page, size, sort);
        checkPageAndSize(page, size);
    }

    @Builder
    public NotePageRequest(int page, int size) {
        this(page, size, SORT_BY_CREATED_DATE);
    }

    private void checkPageAndSize(int page, int size) {
        if (page > MAX_PAGE) {
            throw new IllegalArgumentException("페이지 인덱스는 " + MAX_PAGE + "을(를) 초과할 수 없습니다.");
        }
        if (size > MAX_SIZE) {
            throw new IllegalArgumentException("페이지 사이즈는 " + MAX_SIZE + "을(를) 초과할 수 없습니다.");
        }
    }

    public int getPage() {
        return this.getPageNumber();
    }

    public int getSize() {
        return this.getPageNumber();
    }
}



