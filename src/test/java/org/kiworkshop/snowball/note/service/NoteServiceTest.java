package org.kiworkshop.snowball.note.service;

import org.assertj.core.api.BDDAssertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponseDto;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDtoFixture;
import org.kiworkshop.snowball.note.controller.dto.NoteResponseDto;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteFixture;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.note.entity.PageNoteFixture;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.util.ReflectionTestUtils;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.InstanceOfAssertFactories.OPTIONAL;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {

    @Mock
    private NoteRepository noteRepository;

    @InjectMocks
    private NoteService dut;

    @Test
    void createTest() {
        //given
        given(noteRepository.save(any(Note.class))).willReturn(NoteFixture.create());
        //when
        NoteCreateResponseDto noteCreateResponseDto = dut.createNote(NoteRequestDto.builder().build());
        //then
        assertThat(noteCreateResponseDto.getId()).isEqualTo(1L);
        then(noteRepository).should().save(any(Note.class));
    }

    @Test
    void getNote() {
        //given
        Note note = NoteFixture.create();
        given(noteRepository.findById(anyLong())).willReturn(Optional.of(note));
        //when
        NoteResponseDto responseDto = dut.getNote(1L);
        //then
        assertThat(responseDto.getId()).isEqualTo(note.getId());
        assertThat(responseDto.getCreatedDate()).isBefore(LocalDateTime.now());
        assertThat(responseDto.getInvestmentDate()).isBefore(LocalDate.now());
        assertThat(responseDto.getLastModifiedDate()).isBefore(LocalDateTime.now());
        assertThat(responseDto.getText()).isEqualTo(note.getText());
        then(noteRepository).should().findById(anyLong());
    }

    @Test
    void getByIdThrowsException() {
        //when then
        assertThrows(DomainServiceException.class, () -> dut.getById(1L));
    }

    @Test
    void getNotes() {
        // given
        int page = 1;
        int size = 2;
        PageImpl<Note> pageNote = PageNoteFixture.create();
        given(noteRepository.findAll(any(PageRequest.class))).willReturn(pageNote);

        // when
        Page<NoteResponseDto> pageNoteResponse = dut.getNotes(PageRequest.of(page, size));

        // then
        assertThat(pageNoteResponse.getTotalElements()).isEqualTo(pageNote.getSize());
        assertThat(pageNoteResponse.getContent().get(0).getId()).isEqualTo(pageNote.getContent().get(0).getId());
        assertThat(pageNoteResponse.getContent().get(1).getId()).isEqualTo(2L);
    }

    @Test
    void updateNoteTest() {
        // given
        Long noteId = 1L;
        NoteRequestDto requestDto = NoteRequestDtoFixture.create();
        Note note = NoteFixture.create();
        given(noteRepository.findById(anyLong())).willReturn(Optional.of(note));

        // when
        dut.updateNote(noteId, requestDto);

        // then
        assertThat(note.getText()).isEqualTo(requestDto.getText());
        assertThat(note.getInvestmentDate()).isEqualTo(requestDto.getInvestmentDate());
    }

    @Test
    void deleteNoteTest() {
        // given
        Long noteId = 1L;
        Note note = NoteFixture.create();
        given(noteRepository.findById(anyLong())).willReturn(Optional.of(note));

        // when
        dut.deleteNote(noteId);

        // then
        then(noteRepository).should().delete(any(Note.class));
    }
}