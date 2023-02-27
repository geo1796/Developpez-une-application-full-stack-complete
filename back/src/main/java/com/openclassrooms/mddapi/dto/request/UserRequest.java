package com.openclassrooms.mddapi.dto.request;

import com.openclassrooms.mddapi.validation.EmailValidator;
import com.openclassrooms.mddapi.validation.UsernameValidator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @EmailValidator
    private String email;
    @UsernameValidator
    private String username;
}
