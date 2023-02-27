package com.openclassrooms.mddapi.validation.impl;

import com.openclassrooms.mddapi.validation.UsernameValidator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UsernameValidatorImpl implements ConstraintValidator<UsernameValidator, String> {
    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        if (username == null) {
            return false;
        }

        // Regex for username validation
        String pattern = "^[a-zA-Z]{3,}$";

        return username.matches(pattern);
    }
}

