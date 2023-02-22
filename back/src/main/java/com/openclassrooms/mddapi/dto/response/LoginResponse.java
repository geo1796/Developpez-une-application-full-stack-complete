package com.openclassrooms.mddapi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
public class LoginResponse {
    private String token;
    private Date expiry;
}