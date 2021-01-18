package org.kiworkshop.snowball.note.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query("select n from Note n where n.id = ?1 and n.user.id = ?2")
    Optional<Note> findByIdAndUserId(Long id, Long userId);
}
