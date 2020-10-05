package org.kiworkshop.snowball.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.domain.User;
import org.kiworkshop.snowball.user.repository.UserRepository;
import org.kiworkshop.snowball.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();

    }

    @DisplayName("유저가 생성된다")
    @Test
    void createUserTest() throws Exception {
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

        String url = "http://localhost:" + port + "/login";

        //when
        mvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsBytes(requestDto)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        //then
        User user = userRepository.findByEmail(email).orElseThrow();
        assertThat(user.getName()).isEqualTo(name);
        assertThat(user.getAge()).isEqualTo(age);
        assertThat(user.getGender()).isEqualTo(gender);
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

        userService.join(requestDto);
        User user = userRepository.findByEmail(email).orElseThrow();
        String url = "http://localhost:" + port + "/users/" + user.getId();

        //when, then
        mvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", is(email)))
                .andExpect(jsonPath("$.name", is(name)));
    }
}