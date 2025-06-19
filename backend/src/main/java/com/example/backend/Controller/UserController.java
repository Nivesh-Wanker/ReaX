package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    UserRepository repo;

    @Autowired
    UserService service;

    
    
    @GetMapping("/getuser")
    public List<User> getAll(){
        return repo.findAll();
    }

    @GetMapping("/getuserbyid/{id}")
     public void GetUserById(@PathVariable String id){
        service.GetuserById(id);
    }
    
    @DeleteMapping("/delete/{id}")
     public String deleteById(@PathVariable String id){
        repo.deleteById(id);
        return "deleted";
     }
    }