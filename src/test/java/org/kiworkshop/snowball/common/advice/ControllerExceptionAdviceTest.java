package org.kiworkshop.snowball.common.advice;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.auth.SecurityConfig;
import org.kiworkshop.snowball.note.controller.NoteController;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDto;
import org.kiworkshop.snowball.note.controller.dto.NoteRequestDtoFixture;
import org.kiworkshop.snowball.note.service.NoteService;
import org.kiworkshop.snowball.user.controller.UserController;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDtoFixture;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.util.ReflectionTestUtils;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {UserController.class, NoteController.class},
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)})
class ControllerExceptionAdviceTest extends ControllerTest {

    @MockBean
    private UserService userService;

    @MockBean
    private NoteService noteService;

    @WithMockUser(username = "user", roles = "USER")
    @Test
    void handleInvalidUserRequestParamTest() throws Exception {
        // given
        UserCreateRequestDto requestDto = UserCreateRequestDtoFixture.create();
        ReflectionTestUtils.setField(requestDto, "email", "wrong-email-format@");

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.post("/users")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(requestDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isString())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("email must be a well-formed email address."));
    }

    @WithMockUser(username = "user", roles = "USER")
    @Test
    void handleInvalidNoteRequestParamTest() throws Exception {
        // given
        NoteRequestDto requestDto = NoteRequestDtoFixture.create();
        ReflectionTestUtils.setField(requestDto, "investmentDate", null);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.post("/notes")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(requestDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isString())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("investmentDate must not be null."));
    }
}