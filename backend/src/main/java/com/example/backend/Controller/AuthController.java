package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.service.UserService;

@RestController
public class AuthController {

@Autowired
UserService service;

    @PostMapping("/register")
        public ResponseEntity<ResponseDTO> addUser(@RequestBody UserDto dto){
            ResponseDTO rdto = service.addUser(dto);
            return rdto.getMessage().equals("User added")?ResponseEntity.ok(rdto):ResponseEntity.status(HttpStatus.CONFLICT).body(rdto);
        }

    @PostMapping("/login")
     public ResponseEntity<ResponseDTO> GetUserByEmail(@RequestBody UserLoginDTO dto){
        ResponseDTO rdto = service.GetuserByEmail(dto);
       return rdto.getMessage().equals("login success")?ResponseEntity.ok(rdto):ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(rdto);
    }

}
