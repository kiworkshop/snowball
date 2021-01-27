package org.kiworkshop.snowball.note.controller;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.auth.SecurityConfig;
import org.kiworkshop.snowball.common.exception.DomainServiceException;
import org.kiworkshop.snowball.note.controller.dto.*;
import org.kiworkshop.snowball.note.service.NoteService;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Optional;

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
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = NoteController.class,
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)})
class NoteControllerTest extends ControllerTest {

    @MockBean
    private NoteService noteService;

    @WithMockUser(roles = "USER")
    @Test
    void createNoteTest() throws Exception {
        // given
        NoteRequest noteRequest = NoteRequestFixture.create();
        NoteCreateResponse noteResponse = NoteCreateResponse.builder()
                .id(1L)
                .build();

        given(noteService.createNote(any(NoteRequest.class))).willReturn(noteResponse);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.post("/api/notes")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(noteRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(noteResponse.getId()))
                .andDo(document("note/create-note",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("투자노트 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                subsectionWithPath("stockTransactionRequests")
                                        .type(JsonFieldType.ARRAY).description("주식 거래내역 목록"),
                                subsectionWithPath("stockTransactionRequests[].stockDetailId")
                                        .type(JsonFieldType.NUMBER).description("주식 상세정보 id"),
                                subsectionWithPath("stockTransactionRequests[].quantity")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 수량"),
                                subsectionWithPath("stockTransactionRequests[].tradedPrice")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 매매가격"),
                                subsectionWithPath("stockTransactionRequests[].transactionType")
                                        .type(JsonFieldType.STRING).description("주식 거래내역 종류")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("투자노트 id")
                        )
                ));
    }

    @WithMockUser(roles = "USER")
    @Test
    void getNotesTest() throws Exception {
        // given
        NotePageRequest notePageRequest = NotePageRequestFixture.create();
        Page<NoteResponse> noteResponsePage = NoteResponseFixture.createNoteResponsePage();

        given(noteService.getNotes(any())).willReturn(noteResponsePage);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(notePageRequest)))
                .andExpect(status().isOk())
                .andDo(document("note/get-notes",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                fieldWithPath("page").type(JsonFieldType.NUMBER).description("투자노트 페이지 인덱스 (0부터 시작)"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 당 투자노트 개수")
                        ),
                        responseFields(beneathPath("content[]").withSubsectionId("content"),
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("투자노트 id"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("투자노트 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("투자노트가 생성된 날짜"),
                                fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("투자노트가 수정된 날짜"),
                                subsectionWithPath("stockTransactionResponses")
                                        .type(JsonFieldType.ARRAY).description("주식 거래내역 목록"),
                                subsectionWithPath("stockTransactionResponses[].stockDetailResponse.id")
                                        .type(JsonFieldType.NUMBER).description("주식 상세정보 id"),
                                subsectionWithPath("stockTransactionResponses[].stockDetailResponse.companyName")
                                        .type(JsonFieldType.STRING).description("주식 상세정보 종목명"),
                                subsectionWithPath("stockTransactionResponses[].quantity")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 수량"),
                                subsectionWithPath("stockTransactionResponses[].tradedPrice")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 매매가격"),
                                subsectionWithPath("stockTransactionResponses[].transactionType")
                                        .type(JsonFieldType.STRING).description("주식 거래내역 종류")
                        )
                ));
    }

    @WithMockUser(roles = "USER")
    @Test
    void getNoteTest() throws Exception {
        // given
        NoteResponse noteResponse = NoteResponseFixture.create();
        given(noteService.getNote(1L)).willReturn(noteResponse);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/notes/{id}", noteResponse.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(noteResponse.getId()))
                .andExpect(jsonPath("$.title").value(noteResponse.getTitle()))
                .andExpect(jsonPath("$.content").value(noteResponse.getContent()))
                .andExpect(jsonPath("$.investmentDate").value(noteResponse.getInvestmentDate().toString()))
                .andDo(document("note/get-note",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(parameterWithName("id").description("투자노트 id")
                                .attributes(key("constraints").value("Not Null"))),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("투자노트 id"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("투자노트 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("투자노트가 생성된 날짜"),
                                fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("투자노트가 수정된 날짜"),
                                subsectionWithPath("stockTransactionResponses")
                                        .type(JsonFieldType.ARRAY).description("주식 거래내역 목록"),
                                subsectionWithPath("stockTransactionResponses[].stockDetailResponse.id")
                                        .type(JsonFieldType.NUMBER).description("주식 상세정보 id"),
                                subsectionWithPath("stockTransactionResponses[].stockDetailResponse.companyName")
                                        .type(JsonFieldType.STRING).description("주식 상세정보 종목명"),
                                subsectionWithPath("stockTransactionResponses[].quantity")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 수량"),
                                subsectionWithPath("stockTransactionResponses[].tradedPrice")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 매매가격"),
                                subsectionWithPath("stockTransactionResponses[].transactionType")
                                        .type(JsonFieldType.STRING).description("주식 거래내역 종류")
                        )
                ));
    }

    @WithMockUser(roles = "USER")
    @Test
    void updateNoteTest() throws Exception {
        // given
        Long noteId = 1L;
        NoteRequest requestDto = NoteRequestFixture.create();
        byte[] requestBody = objectMapper.writeValueAsBytes(requestDto);

        given(userRepository.findByEmail(anyString())).willReturn(Optional.ofNullable(UserFixture.create()));

        // when
        mvc.perform(RestDocumentationRequestBuilders.put("/api/notes/{id}", noteId)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").doesNotExist())
                .andDo(document("note/update-note",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("투자노트 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("투자노트 텍스트"),
                                fieldWithPath("investmentDate").type(JsonFieldType.STRING).description("투자한 날짜"),
                                subsectionWithPath("stockTransactionRequests")
                                        .type(JsonFieldType.ARRAY).description("주식 거래내역 목록"),
                                subsectionWithPath("stockTransactionRequests[].stockDetailId")
                                        .type(JsonFieldType.NUMBER).description("주식 상세정보 id"),
                                subsectionWithPath("stockTransactionRequests[].quantity")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 수량"),
                                subsectionWithPath("stockTransactionRequests[].tradedPrice")
                                        .type(JsonFieldType.NUMBER).description("주식 거래내역 매매가격"),
                                subsectionWithPath("stockTransactionRequests[].transactionType")
                                        .type(JsonFieldType.STRING).description("주식 거래내역 종류")
                        ),
                        pathParameters(parameterWithName("id").description("투자노트 id")
                                .attributes(key("constraints").value("Not Null")))
                        )
                );

        // then
        then(noteService).should().updateNote(anyLong(), any(NoteRequest.class));
    }

    @WithMockUser(roles = "USER")
    @Test
    void deleteNoteTest() throws Exception {
        // given
        Long noteId = 1L;
        doNothing().when(noteService).deleteNote(noteId);

        // when
        mvc.perform(RestDocumentationRequestBuilders.delete("/api/notes/{id}", noteId)
                .with(csrf())
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

    @WithMockUser(roles = "USER")
    @Test
    void getNoteNotFoundExceptionTest() throws Exception {
        // given
        Long noteId = 1L;
        given(noteService.getNote(eq(noteId))).willThrow(new DomainServiceException("노트가 존재하지 않습니다."));

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/notes/{id}", noteId))
                .andExpect(status().isNotFound());
    }
}