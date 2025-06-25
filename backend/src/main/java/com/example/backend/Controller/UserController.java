package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import com.example.backend.dto.DashboardDataDto;

@RestController
public class UserController {
    
    @Autowired
    UserRepository repo;

    @Autowired
    UserService service;

    
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/getuser")
    public List<User> getAll(){
        return repo.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getuserbyid/{id}")
    public void GetUserById(@PathVariable String id){
        service.GetuserById(id);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping("/delete/{id}")
    public String deleteById(@PathVariable String id){
        repo.deleteById(id);
        return "deleted";
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/user/dashboard")
    public ResponseEntity<?> getUserDashboard(@RequestParam String email) {
        DashboardDataDto dashboard = service.getDashboardData(email);

        if (dashboard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(dashboard);
    }
    }