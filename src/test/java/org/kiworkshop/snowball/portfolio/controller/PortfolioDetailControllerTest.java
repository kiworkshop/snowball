package org.kiworkshop.snowball.portfolio.controller;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.auth.SecurityConfig;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioDetailResponse;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioDetailResponseFixture;
import org.kiworkshop.snowball.portfolio.service.PortfolioDetailService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PortfolioDetailController.class,
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)})
class PortfolioDetailControllerTest extends ControllerTest {

    @MockBean
    private PortfolioDetailService portfolioDetailService;

    @WithMockUser(roles = "USER")
    @Test
    void getPortfolioDetailTest() throws Exception {
        // given
        PortfolioDetailResponse portfolioDetailResponse = PortfolioDetailResponseFixture.create();
        given(portfolioDetailService.getPortfolioDetail()).willReturn(portfolioDetailResponse);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/portfolio-detail"))
                .andExpect(status().isOk())
                .andDo(document("portfolio/get-portfolio-detail",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        responseFields(
                                subsectionWithPath("portfolioDetailStocks")
                                        .type(JsonFieldType.ARRAY).description("주식 종목별 기본 정보"),
                                subsectionWithPath("portfolioDetailStocks[].companyName")
                                        .type(JsonFieldType.STRING).description("회사명"),
                                subsectionWithPath("portfolioDetailStocks[].averageBuyingPrice")
                                        .type(JsonFieldType.NUMBER).description("매수평균가"),
                                subsectionWithPath("portfolioDetailStocks[].holdingQuantity")
                                        .type(JsonFieldType.NUMBER).description("보유수량"),
                                subsectionWithPath("portfolioDetailStocks[].purchaseAmount")
                                        .type(JsonFieldType.NUMBER).description("매수금액")
                        )
                ));
    }
}