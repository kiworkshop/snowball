package org.kiworkshop.snowball.user.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.auth.oauth2.CustomOAuth2UserService;
import org.kiworkshop.snowball.auth.oauth2.RestAuthenticationEntryPoint;
import org.kiworkshop.snowball.user.controller.dto.UserResponse;
import org.kiworkshop.snowball.user.controller.dto.UserResponseFixture;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doCallRealMethod;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
class UserControllerTest extends ControllerTest {

    @MockBean
    private UserService userService;
    @MockBean
    private CustomOAuth2UserService customOAuth2UserService;
    @MockBean
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @WithMockUser(roles = "USER")
    @Test
    void getUserTest() throws Exception {
        // given
        UserResponse userResponse = UserResponseFixture.create();

        given(userService.getUser(anyLong())).willReturn(userResponse);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/users/{id}", userResponse.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userResponse.getId()))
                .andExpect(jsonPath("$.name").value(userResponse.getName()))
                .andExpect(jsonPath("$.pictureUrl").value(userResponse.getPictureUrl()))
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

    @WithMockUser
    @DisplayName("로그인 기본 페이지 요청 - 200 반환")
    @Test
    void getMeReturnSuccess() throws Exception {
        // given
        UserResponse userResponse = UserResponseFixture.create();

        given(userService.getMe()).willReturn(userResponse);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userResponse.getId()))
                .andExpect(jsonPath("$.name").value(userResponse.getName()))
                .andExpect(jsonPath("$.pictureUrl").value(userResponse.getPictureUrl()))
                .andDo(document("user/get-me-success",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("유저 이름"),
                                fieldWithPath("pictureUrl").type(JsonFieldType.STRING).description("프로필 사진의 url 주소")
                        )
                ));
    }

    @DisplayName("로그인 기본 페이지 요청 - 401 반환")
    @Test
    void getMeReturnUnauthorized() throws Exception {
        // given
        doCallRealMethod().when(restAuthenticationEntryPoint)
                .commence(any(HttpServletRequest.class), any(HttpServletResponse.class), any(AuthenticationException.class));

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/me"))
                .andExpect(status().isUnauthorized())
                .andDo(document("user/get-me-failure",
                        getDocumentRequest(),
                        getDocumentResponse())
                );
    }
}