package org.kiworkshop.snowball.note.controller.dto;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class NotePageRequestFixture {

    public static PageRequest createPageRequest() {
        NotePageRequest notePageRequest = create();
        return PageRequest.of(
                notePageRequest.getPage(),
                notePageRequest.getSize(),
                Sort.by("createdDate").descending());
    }

    public static NotePageRequest create() {
        return NotePageRequest.builder()
                .page(0)
                .size(2)
                .build();
    }
}
