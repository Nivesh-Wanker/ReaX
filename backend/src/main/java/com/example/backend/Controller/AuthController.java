package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.service.UserService;
import com.example.backend.util.JWTUtil;

@RestController
public class AuthController {

@Autowired
UserService service;

@Autowired
JWTUtil jwtutil;

    @PostMapping("/register")
        public ResponseEntity<ResponseDTO> addUser(@RequestBody UserDto dto){
            ResponseDTO rdto = service.addUser(dto);
            if (rdto.getMessage().equals("User added")) {
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Bearer " + jwtutil.generateToken(dto.getEmail(), "user"));
                return ResponseEntity.ok().headers(headers).body(rdto);
            }
            else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body(rdto);
            }
        }

    @PostMapping("/login")
     public ResponseEntity<ResponseDTO> GetUserByEmail(@RequestBody UserLoginDTO dto){
        ResponseDTO rdto = service.GetuserByEmail(dto);
       if (rdto.getMessage().equals("login success")){
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + jwtutil.generateToken(dto.getEmail(), rdto.getUser().isAdmin() ? "admin" : "user"));
            return ResponseEntity.ok().headers(headers).body(rdto);
       }
       else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(rdto);
       }
    }

}