package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.RegisterRequest;
import com.openclassrooms.mddapi.dto.response.LoginResponse;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import com.openclassrooms.mddapi.service.security.MyUserDetailsService;
import com.openclassrooms.mddapi.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/register")
@AllArgsConstructor
public class RegisterController {
    private MyUserDetailsService userDetailsService;
    private UserService userService;
    private JwtUtil jwtUtil;

    @PostMapping()
    ResponseEntity<LoginResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        Optional<User> byEmail = userService.findByEmail(registerRequest.getEmail());
        Optional<User> byUsername = userService.findByUsername(registerRequest.getUsername());
        if (byUsername.isPresent() || byEmail.isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User newUser = userDetailsService.register(registerRequest);
        LoginResponse loginResponse = jwtUtil.generateTokenFromId(String.valueOf(newUser.getId()));
        return ResponseEntity.ok(loginResponse);
    }
}
