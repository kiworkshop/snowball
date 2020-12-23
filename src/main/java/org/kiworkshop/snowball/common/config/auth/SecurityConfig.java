package org.kiworkshop.snowball.common.config.auth;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.entity.Role;
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
                .csrf().disable()
                .headers().frameOptions().disable()
                    .and()
                .authorizeRequests()
                .antMatchers("/", "/static/**", "/h2-console/**").permitAll()
                .anyRequest().permitAll()
                    .and()
                .logout()
                .logoutSuccessUrl("/")
                    .and()
                .oauth2Login()
                .loginPage("/login")
                .defaultSuccessUrl("/")
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
    }
}