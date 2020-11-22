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
                .antMatchers("/oauth2/authorization/google").permitAll()
                .antMatchers("/actuator/**", "/users/**").permitAll()
                .antMatchers("/api/v1/**").permitAll()
                .antMatchers("/notes/**").hasRole(Role.USER.name())
                .antMatchers("/stockdetails/**").hasRole(Role.USER.name())
                .anyRequest().authenticated()
                    .and()
                .oauth2Login()
                .loginPage("/login")
                .defaultSuccessUrl("/")
                    .and()
                .logout()
                .logoutSuccessUrl("/")
                    .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
    }
}