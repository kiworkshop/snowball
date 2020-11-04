package org.kiworkshop.snowball.note.entity;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NoteTest {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void BaseTimeEntityTest(){
        //given
        User user = User.builder().email("test@kiworkshop.com").build();
        Note note = Note.builder().investmentDate(LocalDate.now()).user(user).content("test").build();
        userRepository.save(user);
        noteRepository.save(note);

        //when
        List<Note> notes = noteRepository.findAll();

        //then
        Note firstNote = notes.get(0);
        assertThat(firstNote.getCreatedDate()).isBefore(LocalDateTime.now());
        assertThat(firstNote.getModifiedDate()).isBefore(LocalDateTime.now());
    }

    @Test
    @Transactional
    public void BaseTimeEntityUpdateTest(){
        //given
        User user = User.builder().email("test@kiworkshop.com").build();
        Note note = Note.builder().investmentDate(LocalDate.now()).user(user).content("test").build();
        userRepository.save(user);
        noteRepository.save(note);
        List<Note> notes = noteRepository.findAll();
        notes.get(0).update(Note.builder().investmentDate(LocalDate.now()).user(user).content("testUpdate").build());
        //when
        List<Note> notes2 = noteRepository.findAll();

        //then
        Note firstNote = notes2.get(0);
        assertThat(firstNote.getCreatedDate()).isBefore(firstNote.getModifiedDate());
    }
}