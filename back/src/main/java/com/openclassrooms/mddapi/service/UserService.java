package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
