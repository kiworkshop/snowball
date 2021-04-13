package org.kiworkshop.snowball.portfolio.controller;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.auth.SecurityConfig;
import org.kiworkshop.snowball.portfolio.controller.dto.PortfolioStockResponseFixture;
import org.kiworkshop.snowball.portfolio.service.PortfolioSummaryService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PortfolioSummaryController.class,
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)})
class PortfolioSummaryControllerTest extends ControllerTest {

    @MockBean
    private PortfolioSummaryService portfolioSummaryService;

    @WithMockUser(roles = "USER")
    @Test
    void getPortfolioSummary() throws Exception {
        // given
        given(portfolioSummaryService.getPortfolioSummary()).willReturn(PortfolioStockResponseFixture.createList());

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/api/portfolio-summary"))
                .andExpect(status().isOk())
                .andDo(document("portfolio/get-portfolio-summary",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("주식 종목별 요약 목록"),
                                fieldWithPath("[].companyName").type(JsonFieldType.STRING).description("회사명"),
                                fieldWithPath("[].averageBuyingPrice").type(JsonFieldType.NUMBER).description("매수평균가격"),
                                fieldWithPath("[].targetPrice").type(JsonFieldType.NUMBER).description("목표가격"),
                                fieldWithPath("[].earningsRate").type(JsonFieldType.NUMBER).description("수익률"),
                                fieldWithPath("[].targetEarningsRate").type(JsonFieldType.NUMBER).description("목표수익률"))
                        )
                );
    }
}
