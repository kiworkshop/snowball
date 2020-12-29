package org.kiworkshop.snowball.note.service;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.NoteAssembler;
import org.kiworkshop.snowball.note.controller.dto.NoteCreateResponseDto;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteResponseDto;
import org.kiworkshop.snowball.note.entity.Note;
import org.kiworkshop.snowball.note.entity.NoteRepository;
import org.kiworkshop.snowball.stocktransaction.entity.StockTransactionRepository;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    @Transactional
    public NoteCreateResponseDto createNote(NoteRequestDto noteRequestDto, User user) {
        Note note = NoteAssembler.getNote(noteRequestDto, user);
        // 노트를 따로 만들고, addStockTransaction
        // note.addStockTranctions
        note.getStockTransactions().forEach(stockTransaction -> stockTransaction.addNote(note));

        Note saved = noteRepository.save(note);

        return NoteAssembler.getNoteCreateResponseDto(saved);
    }

    public Page<NoteResponseDto> getNotes(Pageable pageable) {
        Page<Note> notePage = noteRepository.findAll(pageable);
        return notePage.map(NoteAssembler::getNoteResponseDto);
    }

    public NoteResponseDto getNote(Long id) {
        // 주인을 어떻게 확인하면 좋을까요
        Note note = getById(id);
        return NoteAssembler.getNoteResponseDto(note);
    }

    // findByIdAndOwnerId ?? 쿼리레벨까지 내려가는건 괜찮은걸까?
    // 인가를 controller에서 해야만 하는가? 실제로 그럴 수 없다
    // 쿼리레벨부터 안전해질 것 vs 어플리케이션 단의 로깅 등 부차적인 작업
    public Note getById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new DomainServiceException("노트가 존재하지 않습니다."));
    }

    @Transactional
    public void updateNote(Long id, NoteRequestDto noteRequestDto, User user) {
        Note note = getById(id);
        checkNoteOwner(note, user);
        Note noteToUpdate = NoteAssembler.getNote(noteRequestDto, user);
        note.update(noteToUpdate);
    }

    private void checkNoteOwner(Note note, User user) {
        User noteOwner = note.getUser();
        if (!noteOwner.equals(user)) {
            throw new AuthorizationServiceException("해당 노트에 대한 접근 권한이 없습니다.");
        }
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}
