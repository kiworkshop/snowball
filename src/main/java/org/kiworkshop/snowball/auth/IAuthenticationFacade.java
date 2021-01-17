package org.kiworkshop.snowball.auth;

import org.kiworkshop.snowball.user.entity.User;
import org.springframework.security.core.Authentication;

public interface IAuthenticationFacade {

    Authentication getAuthentication();

    User getUser();
}
