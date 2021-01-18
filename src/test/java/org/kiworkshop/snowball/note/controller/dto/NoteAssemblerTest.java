package org.kiworkshop.snowball.note.controller.dto;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.user.Entity.UserFixture;

import static org.assertj.core.api.Assertions.assertThat;

class NoteAssemblerTest {

    @Test
    void getNoteTest() {
        // given
        NoteRequest noteRequest = NoteRequestFixture.create();

        // when
        Note note = NoteAssembler.getNote(noteRequest, UserFixture.create());

        // then
        assertThat(note.getTitle()).isEqualTo(noteRequest.getTitle());
        assertThat(note.getContent()).isEqualTo(noteRequest.getContent());
        assertThat(note.getInvestmentDate()).isEqualTo(noteRequest.getInvestmentDate());

    }
}