package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.request.RegisterRequest;
import com.openclassrooms.mddapi.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;


public interface MyUserDetailsService extends UserDetailsService {
    User getByEmail(String email);
    Optional<User> findByEmail(String email);
    User register(RegisterRequest registerRequest);
    Optional<User> findById(Integer userId);
}
