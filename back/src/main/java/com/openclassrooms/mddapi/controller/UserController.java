package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.UserRequest;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@Slf4j
public class UserController {

    private UserService userService;

    @GetMapping
    User getUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PutMapping
    ResponseEntity<User> updateUser(@RequestBody @Valid UserRequest userRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> byEmail = userService.findByEmail(user.getEmail());
        if (byEmail.isPresent() && !Objects.equals(user.getEmail(), userRequest.getEmail())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Optional<User> byUsername = userService.findByUsername(userRequest.getUsername());
        if (byUsername.isPresent() && !Objects.equals(user.getUsername(), userRequest.getUsername())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        user = userService.updateUser(user, userRequest);
        return ResponseEntity.ok(user);
    }
}
