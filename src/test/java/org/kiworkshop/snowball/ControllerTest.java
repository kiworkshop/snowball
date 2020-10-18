package org.kiworkshop.snowball;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs(uriScheme = "https", uriHost = "docs.api.com")
public abstract class ControllerTest {

    @Autowired
    protected MockMvc mvc;

    @Autowired
    protected ObjectMapper objectMapper;
}