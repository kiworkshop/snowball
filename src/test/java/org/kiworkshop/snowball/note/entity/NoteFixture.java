package org.kiworkshop.snowball.note.entity;

import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class NoteFixture {
    public static Note create(){
        Note note = Note.builder().build();
        ReflectionTestUtils.setField(note, "id", 1L);
        ReflectionTestUtils.setField(note, "text", "NoteFixture");
        ReflectionTestUtils.setField(note, "investmentDate", LocalDate.MIN);
        ReflectionTestUtils.setField(note, "createdDate", LocalDateTime.MIN);
        ReflectionTestUtils.setField(note, "lastModifiedDate", LocalDateTime.MIN);

        return note;
    }
}
