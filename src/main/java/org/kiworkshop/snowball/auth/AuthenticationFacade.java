package org.kiworkshop.snowball.auth;

import lombok.RequiredArgsConstructor;
import org.kiworkshop.snowball.user.entity.User;
import org.kiworkshop.snowball.user.entity.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuthenticationFacade implements IAuthenticationFacade {

    private final UserRepository userRepository;

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public User getUser() {
        Object principal = getAuthentication().getPrincipal();
        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) principal;
        String userEmail = oAuth2User.getAttribute("email");
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("유저 attribute가 존재하지 않습니다."));
        return user;
    }
}