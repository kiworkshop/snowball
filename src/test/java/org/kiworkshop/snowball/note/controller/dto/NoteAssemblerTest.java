package org.kiworkshop.snowball.note.controller.dto;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.user.Entity.UserFixture;

import static org.assertj.core.api.Assertions.assertThat;

class NoteAssemblerTest {

    @Test
    void getNoteTest() {
        // given
        NoteRequestDto requestDto = NoteRequestDtoFixture.create();

        // when
        Note note = NoteAssembler.getNote(requestDto, UserFixture.create());

        // then
        assertThat(note.getStockTransactions().size()).isEqualTo(requestDto.getStockTransactions().size());
        assertThat(note.getStockTransactions().get(0)).isEqualToComparingFieldByField(requestDto.getStockTransactions().get(0));
        assertThat(note.getStockTransactions().get(1)).isEqualToComparingFieldByField(requestDto.getStockTransactions().get(1));

    }
}