package org.kiworkshop.snowball.note.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.service.NoteService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NoteController.class)
class NoteControllerTest extends ControllerTest {

    @MockBean
    private NoteService noteService;

    @Test
    void createNoteTest() throws Exception {
        // given
        NoteRequestDto requestDto = NoteRequestDtoFixture.create();
        NoteCreateResponseDto responseDto = NoteCreateResponseDto.builder()
                .id(1L)
                .build();

        given(noteService.createNote(any())).willReturn(responseDto);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.post("/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(requestDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(responseDto.getId()))
                .andDo(document("note/create-note",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                fieldWithPath("text").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                subsectionWithPath("user").type(JsonFieldType.OBJECT).description("투자노트를 작성한 유저")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("투자노트 id")
                        )
                ));
    }

    @Test
    void getNotesTest() throws Exception {
        // given
        NotePageRequestDto notePageRequestDto = NotePageRequestDto.builder()
                .size(2)
                .page(1)
                .build();

        NoteResponseDto noteResponseDto1 = NoteResponseDto.builder()
                .id(1L)
                .text("첫번째 투자노트 텍스트입니다.")
                .investmentDate(LocalDate.of(2020, 10, 8))
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .build();

        NoteResponseDto noteResponseDto2 = NoteResponseDto.builder()
                .id(2L)
                .text("두번째 투자노트 텍스트입니다.")
                .investmentDate(LocalDate.of(2020, 10, 9))
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .build();

        List<NoteResponseDto> noteResponseDtoList = new ArrayList<>();
        noteResponseDtoList.add(noteResponseDto1);
        noteResponseDtoList.add(noteResponseDto2);

        Page<NoteResponseDto> responseDto = new PageImpl<>(noteResponseDtoList);

        given(noteService.getNotes(any())).willReturn(responseDto);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(notePageRequestDto)))
                .andExpect(status().isOk())
                .andDo(document("note/get-notes",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 당 투자노트 개수"),
                                fieldWithPath("page").type(JsonFieldType.NUMBER).description("페이지 수")
                        ),
                        responseFields(beneathPath("content[]").withSubsectionId("content"),
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("투자노트 id"),
                                fieldWithPath("text").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("투자노트가 생성된 날짜"),
                                fieldWithPath("lastModifiedDate").type(JsonFieldType.STRING).description("투자노트가 수정된 날짜")
                        )
                ));
    }

    @Test
    void getNoteTest() throws Exception {
        // given
        Long id = 1L;
        NoteResponseDto responseDto = NoteResponseDto.builder()
                .id(id)
                .text("투자노트 텍스트입니다.")
                .investmentDate(LocalDate.of(2020, 10, 10))
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .build();

        given(noteService.getNote(1L)).willReturn(responseDto);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/notes/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(responseDto.getId()))
                .andExpect(jsonPath("$.text").value(responseDto.getText()))
                .andExpect(jsonPath("$.investmentDate").value(responseDto.getInvestmentDate().toString()))
                .andDo(document("note/get-note",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(parameterWithName("id").description("투자노트 id")
                                .attributes(key("constraints").value("Not Null"))),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("투자노트 id"),
                                fieldWithPath("text").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("투자노트가 생성된 날짜"),
                                fieldWithPath("lastModifiedDate").type(JsonFieldType.STRING).description("투자노트가 수정된 날짜")
                        )
                ));

    }

    @Test
    void updateNoteTest() throws Exception {
        // given
        Long noteId = 1L;
        NoteRequestDto requestDto = NoteRequestDtoFixture.create();
        byte[] requestBody = objectMapper.writeValueAsBytes(requestDto);

        // when
        mvc.perform(RestDocumentationRequestBuilders.put("/notes/{id}", noteId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").doesNotExist())
                .andDo(document("note/update-note",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                fieldWithPath("text").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                subsectionWithPath("user").type(JsonFieldType.OBJECT).description("투자노트를 작성한 유저")
                        ),
                        pathParameters(parameterWithName("id").description("투자노트 id")
                                .attributes(key("constraints").value("Not Null")))
                        )
                );

        // then
        verify(noteService).updateNote(eq(noteId), argThat(arg -> {
            try {
                return Arrays.equals(requestBody, objectMapper.writeValueAsBytes(arg));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            return false;
        }));
        then(noteService).should().updateNote(anyLong(), any(NoteRequestDto.class));
    }

    @Test
    void deleteNoteTest() throws Exception {
        // given
        Long noteId = 1L;
        doNothing().when(noteService).deleteNote(noteId);

        // when
        mvc.perform(RestDocumentationRequestBuilders.delete("/notes/{id}", noteId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").doesNotExist())
                .andDo(document("note/delete-note",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(parameterWithName("id").description("투자노트 id")
                                .attributes(key("constraints").value("Not Null")))
                        )
                );

        // then
        verify(noteService).deleteNote(anyLong());
        then(noteService).should().deleteNote(anyLong());
    }

    @Test
    void getNoteNotFoundExceptionTest() throws Exception {
        // given
        Long noteId = 1L;
        given(noteService.getNote(eq(noteId))).willThrow(new DomainServiceException("노트가 존재하지 않습니다."));

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/notes/{id}", noteId))
                .andExpect(status().isNotFound());
    }
}