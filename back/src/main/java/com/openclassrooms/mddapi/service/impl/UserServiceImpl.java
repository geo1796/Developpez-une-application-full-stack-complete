package com.openclassrooms.mddapi.service.impl;

import com.openclassrooms.mddapi.exception.BadRequestException;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void followTopic(User user, Topic topic) {
        if (user.getFollowing().contains(topic)) {
            throw new BadRequestException();
        }
        user.getFollowing().add(topic);
        userRepository.save(user);
    }

    @Override
    public void unfollowTopic(User user, Topic topic) {
        if (!user.getFollowing().contains(topic)) {
            throw new BadRequestException();
        }
        user.getFollowing().remove(topic);
        userRepository.save(user);
    }
}
