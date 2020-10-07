package org.kiworkshop.snowball.user.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateResponseDto;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest extends ControllerTest {

    @MockBean
    private UserService userService;

    @DisplayName("유저가 생성된다")
    @Test
    void createUserTest() throws Exception {
        // given
        String email = "snowman@snowball.com";
        String name = "snowman";
        int age = 100;
        String gender = "snow";
        UserCreateRequestDto requestDto = UserCreateRequestDto.builder()
                .email(email)
                .name(name)
                .age(age)
                .gender(gender)
                .pictureUrl("")
                .build();
        UserCreateResponseDto responseDto = UserCreateResponseDto.builder()
                .id(1L)
                .name(name)
                .pictureUrl("")
                .build();

        given(userService.join(any())).willReturn(responseDto);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(requestDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(responseDto.getId()))
                .andExpect(jsonPath("$.name").value(responseDto.getName()))
                .andExpect(jsonPath("$.pictureUrl").value(responseDto.getPictureUrl()))
                .andDo(document("user/create-user",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("유저 이름"),
                                fieldWithPath("age").type(JsonFieldType.NUMBER).description("나이"),
                                fieldWithPath("gender").type(JsonFieldType.STRING).description("성별"),
                                fieldWithPath("pictureUrl").type(JsonFieldType.STRING).description("프로필 사진의 url 주소")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("유저 이름"),
                                fieldWithPath("pictureUrl").type(JsonFieldType.STRING).description("프로필 사진의 url 주소")
                        )
                ));
    }

    @DisplayName("유저 조회 시 dto를 반환한다")
    @Test
    void getUserTest() throws Exception {
        //given
        String email = "snowman@snowball.com";
        String name = "snowman";
        int age = 100;
        String gender = "snow";
        UserCreateRequestDto requestDto = UserCreateRequestDto.builder()
                .email(email)
                .name(name)
                .age(age)
                .gender(gender)
                .pictureUrl("")
                .build();

//        userService.join(requestDto);
//        User user = userRepository.findByEmail(email).orElseThrow();
//        String url = "http://localhost:" + port + "/users/" + user.getId();
//
//        //when, then
//        mockMvc.perform(get(url))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.email", is(email)))
//                .andExpect(jsonPath("$.name", is(name)));
    }
}