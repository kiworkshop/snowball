package org.kiworkshop.snowball.user.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDtoFixture;
import org.kiworkshop.snowball.user.controller.dto.UserLoginRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserResponse;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void getUser() {
        // given
        User user = UserFixture.create();
        ReflectionTestUtils.setField(user, "id", 1L);
        given(userRepository.findById(anyLong())).willReturn(Optional.of(user));

        // when
        UserResponse responseDto = userService.getUser(1L);

        // then
        assertThat(responseDto.getId()).isEqualTo(user.getId());
        assertThat(responseDto.getName()).isEqualTo(user.getName());
        assertThat(responseDto.getPictureUrl()).isEqualTo(user.getPictureUrl());
    }
}