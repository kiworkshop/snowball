package org.kiworkshop.snowball.user.repository;

import org.kiworkshop.snowball.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
