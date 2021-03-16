package org.kiworkshop.snowball.auth;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.auth.oauth2.CustomOAuth2UserService;
import org.kiworkshop.snowball.auth.oauth2.RestAuthenticationEntryPoint;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers(
                        "/user/login", "/oauth2/**",
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
                    .logoutSuccessUrl("/user/login")
                    .clearAuthentication(true)
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                .and()
                    .oauth2Login()
                    .loginPage("/user/login")
                    .defaultSuccessUrl("/")
                    .userInfoEndpoint()
                        .userService(customOAuth2UserService);
    }
}