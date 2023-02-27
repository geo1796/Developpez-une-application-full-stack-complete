package com.openclassrooms.mddapi.dto.request;

import com.openclassrooms.mddapi.validation.EmailValidator;
import com.openclassrooms.mddapi.validation.PasswordValidator;
import com.openclassrooms.mddapi.validation.UsernameValidator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterRequest {
    @UsernameValidator
    private String username;
    @EmailValidator
    private String email;
    @PasswordValidator
    private String password;
}