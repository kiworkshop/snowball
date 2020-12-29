package org.kiworkshop.snowball.portfolio.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.common.config.auth.SecurityConfig;
import org.kiworkshop.snowball.common.config.auth.dto.SessionUser;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponseDtoFixture;
import org.kiworkshop.snowball.portfolio.service.PortfolioSummaryService;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Optional;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PortfolioSummaryController.class,
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)})
class PortfolioSummaryControllerTest extends ControllerTest{

    @MockBean
    private PortfolioSummaryService portfolioSummaryService;
    @MockBean
    private UserRepository userRepository;
    private User userFixture;

    @BeforeEach
    void setUp() {
        userFixture = UserFixture.create();
    }

    @WithMockUser(roles = "USER")
    @Test
    void getStockDetails() throws Exception {
        Long userId = 1L;
        // given
        given(portfolioSummaryService.getPortfolioSummary(userId)).willReturn(PortfolioStockResponseDtoFixture.createList());
        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(userFixture));

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/portfolio-summary").sessionAttr("user", new SessionUser(userFixture)))
                .andExpect(status().isOk())
                .andDo(document("portfolio/get-portfolio-summary",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        responseFields(
                                fieldWithPath("[].companyName").type(JsonFieldType.STRING).description("회사명"),
                                fieldWithPath("[].averageBuyingPrice").type(JsonFieldType.NUMBER).description("매수평균가격"),
                                fieldWithPath("[].targetPrice").type(JsonFieldType.NUMBER).description("목표가격"),
                                fieldWithPath("[].earningsRate").type(JsonFieldType.NUMBER).description("수익률"),
                                fieldWithPath("[].targetEarningsRate").type(JsonFieldType.NUMBER).description("목표수익률")                        )
                        )
                );
    }
}
