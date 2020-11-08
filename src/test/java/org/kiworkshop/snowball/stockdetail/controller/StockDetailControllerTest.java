package org.kiworkshop.snowball.stockdetail.controller;

import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.ControllerTest;
import org.kiworkshop.snowball.stockdetail.entity.StockDetail;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailFixture;
import org.kiworkshop.snowball.stockdetail.entity.StockDetailRepository;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.*;

import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentRequest;
import static org.kiworkshop.snowball.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StockDetailController.class)
class StockDetailControllerTest extends ControllerTest {

    @MockBean
    private StockDetailRepository stockDetailRepository;

    @Test
    void getStockDetails() throws Exception {

        // given
        List<StockDetail> stockDetails = new ArrayList<>();
        stockDetails.add(StockDetailFixture.create());
        PageImpl<StockDetail> stockDetailPage = new PageImpl<>(stockDetails);
        given(stockDetailRepository.findAll(any(Pageable.class))).willReturn(stockDetailPage);

        // when & then
        mvc.perform(RestDocumentationRequestBuilders.get("/stockdetails")
                .param("page", "1")
                .param("size", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("stockdetail/get-stockdetails",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestParameters(
                                parameterWithName("page").description("페이지 수"),
                                parameterWithName("size").description("페이지 당 주식상세정보 개수")
                        ),
                        responseFields(beneathPath("content[]").withSubsectionId("content"),
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("주식상세정보 id"),
                                fieldWithPath("companyName").type(JsonFieldType.STRING).description("회사명"),
                                fieldWithPath("itemCode").type(JsonFieldType.STRING).description("종목코드"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("업종"),
                                fieldWithPath("mainProduct").type(JsonFieldType.STRING).description("주요제품"),
                                fieldWithPath("listingDate").type(JsonFieldType.STRING).description("상장일"),
                                fieldWithPath("settlementMonth").type(JsonFieldType.STRING).description("결산월"),
                                fieldWithPath("representative").type(JsonFieldType.STRING).description("대표자명"),
                                fieldWithPath("marketType").type(JsonFieldType.STRING).description("시장종류"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("주식상세정보가 생성된 날짜"),
                                fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("주식상세정보가 수정된 날짜")
                                )
                        )
                );
    }
}