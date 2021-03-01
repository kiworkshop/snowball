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
                        "/", "/login", "/oauth2/**",
                        "/actuator/**",
                        "/static/**",
                        "/h2-console/**")
                        .permitAll()
                    .anyRequest().authenticated()
                .and()
                    .csrf().disable()
                    .headers().frameOptions().disable()
                .and()
                    .exceptionHandling()
                        .authenticationEntryPoint(restAuthenticationEntryPoint)
                .and()
                    .logout()
                    .logoutSuccessUrl("/")
                    .clearAuthentication(true)
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                .and()
                    .oauth2Login()
                    .defaultSuccessUrl("/")
                    .userInfoEndpoint()
                        .userService(customOAuth2UserService);
    }
}