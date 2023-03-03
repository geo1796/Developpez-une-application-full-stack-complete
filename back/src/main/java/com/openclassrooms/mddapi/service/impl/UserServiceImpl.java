package com.openclassrooms.mddapi.service.impl;

import com.openclassrooms.mddapi.dto.request.UserRequest;
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

    /**
     *
     * @param id The id of the User to retrieve
     * @return an Optional of User corresponding to the param id
     */
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     *
     * @param username The username of the User to retrieve
     * @return an Optional of User corresponding to the param username
     */
    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    /**
     *
     * @param email The email of the User to retrieve
     * @return an Optional of User corresponding to the param email
     */
    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     *
     * @param user The User who has requested to add the Topic to his following list
     * @param topic The Topic which the User has requested to follow
     */
    @Override
    public void followTopic(User user, Topic topic) {
        if (user.getFollowing().contains(topic)) {
            throw new BadRequestException();
        }
        user.getFollowing().add(topic);
        userRepository.save(user);
    }

    /**
     *
     * @param user The User who has requested remove the Topic from his following list
     * @param topic The Topic which the User has requested to unfollow
     */
    @Override
    public void unfollowTopic(User user, Topic topic) {
        if (!user.getFollowing().contains(topic)) {
            throw new BadRequestException();
        }
        user.getFollowing().remove(topic);
        userRepository.save(user);
    }

    /**
     *
     * @param user The User to update
     * @param userRequest The request holding the data to update the User with
     * @return
     */
    @Override
    public User updateUser(User user, UserRequest userRequest) {
        user.setEmail(userRequest.getEmail());
        user.setUsername(userRequest.getUsername());
        return userRepository.save(user);
    }
}
