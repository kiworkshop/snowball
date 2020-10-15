package org.kiworkshop.snowball.user.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserCreateRequestDtoFixture;
import org.kiworkshop.snowball.user.controller.dto.UserLoginRequestDto;
import org.kiworkshop.snowball.user.controller.dto.UserResponseDto;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
    void join() {
        // given
        User user = UserFixture.create();
        UserCreateRequestDto requestDto = UserCreateRequestDtoFixture.create();
        given(userRepository.save(any(User.class))).willReturn(user);

        // when
        UserResponseDto responseDto = userService.join(requestDto);

        // then
        assertThat(responseDto.getId()).isEqualTo(user.getId());
        assertThat(responseDto.getName()).isEqualTo(user.getName());
        then(userRepository).should().save(any(User.class));
    }

    @Test
    void getUser() {
        // given
        User user = UserFixture.create();
        given(userRepository.findById(anyLong())).willReturn(Optional.of(user));

        // when
        UserResponseDto responseDto = userService.getUser(user.getId());

        // then
        assertThat(responseDto.getId()).isEqualTo(user.getId());
        assertThat(responseDto.getName()).isEqualTo(user.getName());
        assertThat(responseDto.getPictureUrl()).isEqualTo(user.getPictureUrl());
    }

    @Test
    void login() {
        // given
        UserLoginRequestDto requestDto = new UserLoginRequestDto();
        User user = UserFixture.create();
        given(userRepository.findById(anyLong())).willReturn(Optional.of(user));

        // when
        UserResponseDto responseDto = userService.login(requestDto);

        // then
        assertThat(responseDto.getId()).isEqualTo(user.getId());
        assertThat(responseDto.getName()).isEqualTo(user.getName());
        assertThat(responseDto.getPictureUrl()).isEqualTo(user.getPictureUrl());
    }
}