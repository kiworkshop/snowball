package org.kiworkshop.snowball.note.controller.dto;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.note.entity.Note;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class NoteAssemblerTest {

    @Test
    void getNoteTest() {
        // given
        NoteRequestDto requestDto = NoteRequestDtoFixture.create();

        // when
        Note note = NoteAssembler.getNote(requestDto);

        // then
        assertThat(note.getStockTransactions().size()).isEqualTo(requestDto.getStockTransactions().size());
        assertThat(note.getStockTransactions().get(0)).isEqualToComparingFieldByField(requestDto.getStockTransactions().get(0));
        assertThat(note.getStockTransactions().get(1)).isEqualToComparingFieldByField(requestDto.getStockTransactions().get(1));

    }
}