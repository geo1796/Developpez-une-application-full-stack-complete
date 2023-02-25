package com.openclassrooms.mddapi.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.openclassrooms.mddapi.dto.response.LoginResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {
    @Value("${security.jwtSecret")
    private String jwtSecret;

    @Value("${security.jwtExpiration}")
    private int jwtExpiration;

    public LoginResponse generateTokenFromId(String id) {
        Instant now = Instant.now();
        Instant expiry = now.plus(this.jwtExpiration, ChronoUnit.MILLIS);
        String token = JWT.create()
                .withSubject(id)
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiry))
                .sign(Algorithm.HMAC256(this.jwtSecret));
        return new LoginResponse(token, Date.from(expiry));
    }

    public String getUserIdFromJwtToken(String jwt) {
        if (jwt == null){
            throw new JWTVerificationException("token is null");
        }
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(this.jwtSecret)).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        return decodedJWT.getSubject();
    }

    public boolean validateJwtToken(String jwt) {
        if (jwt == null){
            return false;
        }

        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(this.jwtSecret)).build();
            verifier.verify(jwt);
        }
        catch (JWTVerificationException e){
            return false;
        }

        return true;
    }
}
