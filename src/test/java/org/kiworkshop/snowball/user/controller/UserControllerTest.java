package org.kiworkshop.snowball.user.controller;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.user.controller.dto.UserResponseDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest extends ControllerTest {

    @MockBean
    private UserService userService;

    @Test
    void createUserTest() throws Exception {
        // given
        Long id = 1L;
        String email = "snowman@snowball.com";
        String name = "snowman";
        int age = 100;
        String gender = "snow";
        String pictureUrl = URLEncoder.encode("https://example.snowman-picture.com", StandardCharsets.UTF_8);
        UserCreateRequestDto requestDto = UserCreateRequestDto.builder()
                .email(email)
                .name(name)
                .age(age)
                .gender(gender)
                .pictureUrl(pictureUrl)
                .build();
        UserResponseDto responseDto = UserResponseDto.builder()
                .id(id)
                .name(name)
                .pictureUrl(pictureUrl)
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

    @Test
    void getUserTest() throws Exception {
        // given
        Long id = 1L;
        String name = "snowman";
        String pictureUrl = URLEncoder.encode("https://example.snowman-picture.com", StandardCharsets.UTF_8);
        UserResponseDto responseDto = UserResponseDto.builder()
                .id(id)
                .name(name)
                .pictureUrl(pictureUrl)
                .build();

        given(userService.getUser(id)).willReturn(responseDto);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/users/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(responseDto.getId()))
                .andExpect(jsonPath("$.name").value(responseDto.getName()))
                .andExpect(jsonPath("$.pictureUrl").value(responseDto.getPictureUrl()))
                .andDo(document("user/get-user",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(parameterWithName("id").description("유저 id")
                                .attributes(key("constraints").value("Not Null"))),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("유저 이름"),
                                fieldWithPath("pictureUrl").type(JsonFieldType.STRING).description("프로필 사진의 url 주소")
                        )
                ));
    }

    @Test
    void loginTest() throws Exception {
        // given
        Long id = 1L;
        String name = "snowman";
        String pictureUrl = URLEncoder.encode("https://example.snowman-picture.com", StandardCharsets.UTF_8);
        UserResponseDto responseDto = UserResponseDto.builder()
                .id(id)
                .name(name)
                .pictureUrl(pictureUrl)
                .build();

        given(userService.login(any())).willReturn(responseDto);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/login"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(responseDto.getId()))
                .andExpect(jsonPath("$.name").value(responseDto.getName()))
                .andExpect(jsonPath("$.pictureUrl").value(responseDto.getPictureUrl()))
                .andDo(document("user/login",
                        getDocumentResponse(),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("유저 이름"),
                                fieldWithPath("pictureUrl").type(JsonFieldType.STRING).description("프로필 사진의 url 주소")
                        )
                ));
    }
}