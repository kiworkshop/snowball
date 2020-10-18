package org.kiworkshop.snowball.note.entity;

import java.util.List;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;

public class PageNoteFixture {

    public static PageImpl<Note> create() {
        Note note1 = NoteFixture.create();
        Note note2 = NoteFixture.create();
        ReflectionTestUtils.setField(note2, "id", 2L);

        List<Note> noteList = new ArrayList<>();
        noteList.add(note1);
        noteList.add(note2);
        return new PageImpl<>(noteList);
    }
}
