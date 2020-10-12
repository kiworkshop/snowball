package org.kiworkshop.snowball.note.entity;

import org.springframework.test.util.ReflectionTestUtils;

public class NoteFixture {
    public static Note create(){
        Note note = Note.builder().build();
        ReflectionTestUtils.setField(note, "id", 1L);
        return note;
    }
}
