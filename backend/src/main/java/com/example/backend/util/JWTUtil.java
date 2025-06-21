package com.example.backend.util;

import org.springframework.stereotype.Component;
import java.util.*;
// For JWT creation and parsing
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

// For handling secret key
import java.security.Key;

// For setting issued and expiration time
import java.util.Date;

@Component
public class JWTUtil{
    private static String secretKey = "ThisIsASecretKeyForOurReaXApplication";

    /**
     * Generates a JWT token with the given subject and role.
     *
     * @param name the subject (typically a username or identifier)
     * @param role the user's role to include as a claim
     * @return a signed JWT token with a 24-hour expiration
     */
    public String generateToken(String email, String role){
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.builder()
        .setSubject(email)
        .claim("role",role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(key,SignatureAlgorithm.HS256)
        .compact();
    }
    
     /**
     * Validates the integrity and expiration of the given JWT token.
     *
     * @param token the JWT token to validate
     * @return true if the token is valid; false otherwise
     */
    public boolean validateToken(String token){
        try{
            Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            System.out.println("Token expired: " + e.getMessage());
        } catch (io.jsonwebtoken.security.SignatureException e) {
            System.out.println("Invalid signature: " + e.getMessage());
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            System.out.println("Malformed token: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Invalid token: " + e.getMessage());
        }
        return false;
    }

    /**
     * Extracts claims (payload) from the given JWT token.
     *
     * @param token the JWT token
     * @return Claims object if successfully parsed; null if token is invalid
     */
    public Claims extractClaims(String token) {
    try {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.parserBuilder()
                   .setSigningKey(key)
                   .build()
                   .parseClaimsJws(token)
                   .getBody();  
    } catch (Exception e) {
        System.out.println("Could not extract claims: " + e.getMessage());
        return null;
    }
}


}

