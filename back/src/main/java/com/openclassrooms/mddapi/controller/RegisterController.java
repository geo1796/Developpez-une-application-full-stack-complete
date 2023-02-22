package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.RegisterRequest;
import com.openclassrooms.mddapi.dto.response.LoginResponse;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.MyUserDetailsService;
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
    private JwtUtil jwtUtil;

    @PostMapping()
    ResponseEntity<LoginResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        Optional<User> byEmail = userDetailsService.findByEmail(registerRequest.getEmail());
        Optional<User> byUsername = userDetailsService.findByUsername(registerRequest.getUsername());
        if (byUsername.isPresent() || byEmail.isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User newUser = userDetailsService.register(registerRequest);
        LoginResponse loginResponse = jwtUtil.generateTokenFromEmail(newUser.getEmail());
        return ResponseEntity.ok(loginResponse);
    }
}
