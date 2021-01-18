package org.kiworkshop.snowball.auth;

import org.kiworkshop.snowball.user.Entity.UserFixture;
import org.kiworkshop.snowball.user.entity.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class AuthenticationFixture {

    public static Authentication create() {
        User user = UserFixture.create();
        Set<GrantedAuthority> authorities = new HashSet<>(AuthorityUtils.createAuthorityList("USER"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(createOAuth2User(), "TestCredentials", authorities);
        return authentication;
    }

    public static OAuth2User createOAuth2User() {
        Set<GrantedAuthority> authorities = new HashSet<>(AuthorityUtils.createAuthorityList("USER"));
        OAuth2User oAuth2User = new DefaultOAuth2User(authorities, Collections.singletonMap("email", "snowman@snowball.com"), "email");
        return oAuth2User;
    }
}
