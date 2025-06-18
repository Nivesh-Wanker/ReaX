package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.admin_dto;
import com.example.backend.model.Admin;
import com.example.backend.repository.TestDocRepository;
import com.example.backend.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    TestDocRepository repo;

    @Autowired
    UserService service;

    @PostMapping("/adduser")
        public void add_user(@RequestBody admin_dto dto){
            service.addUser(dto);
        }
    
    @GetMapping("/getuser")
    public List<Admin> getAll(){
        return repo.findAll();
    }

    @GetMapping("/getuser/{id}")
     public void GetUserById(@PathVariable String id){
        service.GetuserById(id);
    }
    @DeleteMapping("/delete/{id}")
     public String deleteById(@PathVariable String id){
        repo.deleteById(id);
        return "deleted";
     }
    }



