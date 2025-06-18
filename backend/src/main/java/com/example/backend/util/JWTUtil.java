package com.example.backend.util;

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


public class JWTUtil{
    private static String secretKey = "ThisIsASecretKeyForOurReaXApplication";
    public String generateToken(String name, String role){
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.builder()
        .setSubject(name)
        .claim("role",role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(key,SignatureAlgorithm.HS256)
        .compact();
    }
}

