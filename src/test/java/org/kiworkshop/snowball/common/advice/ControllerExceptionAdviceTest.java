package org.kiworkshop.snowball.common.advice;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.note.controller.NoteController;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDtoFixture;
import org.kiworkshop.snowball.note.service.NoteService;
import org.kiworkshop.snowball.user.controller.UserController;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDtoFixture;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({UserController.class, NoteController.class})
class ControllerExceptionAdviceTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private NoteService noteService;

    @Test
    void handleInvalidUserRequestParamTest() throws Exception {
        // given
        UserCreateRequestDto requestDto = UserCreateRequestDtoFixture.create();
        ReflectionTestUtils.setField(requestDto, "email", "wrong-email-format@");

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(requestDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isString())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("email must be a well-formed email address."));
    }

    @Test
    void handleInvalidNoteRequestParamTest() throws Exception {
        // given
        NoteRequestDto requestDto = NoteRequestDtoFixture.create();
        ReflectionTestUtils.setField(requestDto, "investmentDate", null);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.post("/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(requestDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isString())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("investmentDate must not be null."));
    }
}