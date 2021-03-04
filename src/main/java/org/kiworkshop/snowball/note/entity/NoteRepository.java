package org.kiworkshop.snowball.note.entity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query("select n from Note n where n.id = ?1 and n.user.id = ?2")
    Optional<Note> findByIdAndUserId(Long id, Long userId);

    Page<Note> findAllByUserId(Pageable pageable, Long userId);

    List<Note> findByInvestmentDateBetween(LocalDate from, LocalDate to);

    List<Note> findByUserIdAndInvestmentDateBetween(Long userId, LocalDate to, LocalDate from);
}
