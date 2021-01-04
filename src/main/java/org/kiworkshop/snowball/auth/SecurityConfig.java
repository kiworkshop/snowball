package org.kiworkshop.snowball.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers(
                        "/login", "/oauth2/**",
                        "/actuator/**",
                        "/static/**",
                        "/h2-console/**")
                        .permitAll()
                    .anyRequest().authenticated()
                .and()
                    .csrf().disable()
                    .headers().frameOptions().disable()
                .and()
                    .logout()
                    .logoutSuccessUrl("/")
                    .invalidateHttpSession(true)
                .and()
                    .oauth2Login()
                    .loginPage("/login")
                    .defaultSuccessUrl("/")
                    .userInfoEndpoint()
                    .userService(customOAuth2UserService);
    }
    // 로그인했는지 안했는지 판단을 프론트에서 어떻게 할 수 있을까?
    // 401이 떨어질 수 있는 요청이 최소 한번은 필요할 것
    // 401(ex.자기 정보 가져오는 요청) -> login 페이지 -> 구글 로그인 버튼 클릭
}