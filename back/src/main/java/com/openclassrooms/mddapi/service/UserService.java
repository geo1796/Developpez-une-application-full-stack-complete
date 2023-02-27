package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.request.UserRequest;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    void followTopic(User user, Topic topic);

    void unfollowTopic(User user, Topic topic);

    User updateUser(User user, UserRequest userRequest);
}
