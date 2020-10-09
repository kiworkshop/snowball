package org.kiworkshop.snowball.note.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.kiworkshop.snowball.user.domain.User;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;

    private LocalDate investmentDate;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Builder
    public Note(String text, LocalDate investmentDate, LocalDateTime createdDate, LocalDateTime lastModifiedDate, User user) {
        this.text = text;
        this.investmentDate = investmentDate;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.user = user;
    }
}
