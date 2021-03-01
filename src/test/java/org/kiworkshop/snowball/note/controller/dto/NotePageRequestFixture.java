package org.kiworkshop.snowball.note.controller.dto;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class NotePageRequestFixture {

    public static NotePageRequest create(int page, int size) {
        return new NotePageRequest(page, size);
    }
}
