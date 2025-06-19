package com.example.backend.service;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
    @Service
    public class UserService{
    
    @Autowired
    UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User mapDtoUser(UserDto dto){
        User doc=new User();
        doc.setId(UUID.randomUUID().toString());
        doc.setName(dto.getName());
        doc.setEmail(dto.getEmail());
        doc.setAdmin(false);
        String encryptedPassword = passwordEncoder.encode(dto.getPassword());
        doc.setPassword(encryptedPassword);
        doc.setCreatedBy(dto.getName());
        doc.setUpdatedBy(dto.getName());
        return doc;
    }
    
    public ResponseEntity<String> addUser(UserDto dto){
        User matchedUser = repo.findAll().stream()
        .filter(u -> u.getEmail().equals(dto.getEmail()))
        .findFirst()
        .orElse(null);
            // User doc= mapDtoUser(dto);
            // repo.save(doc);
        System.out.println(matchedUser + "check variable");
        if (matchedUser == null) {
            User doc= mapDtoUser(dto);
            repo.save(doc);
            return ResponseEntity.ok("Admin added");
        } 
        else {
            System.out.println("inside else block");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User Already exists");
        }
    }

    public ResponseEntity<User> GetuserById(@PathVariable String id){
        return repo.findById(id)
               .map(ResponseEntity::ok)          // → 200 OK with the TestDoc JSON
               .orElse(ResponseEntity.notFound() // → 404 if id not present
                                        .build());
    }
    public ResponseEntity<String> GetuserByEmail(UserLoginDTO dto){
        User matchedUser = repo.findAll().stream()
        .filter(u -> u.getEmail().equals(dto.getEmail()) &&
                     passwordEncoder.matches(dto.getPassword(), u.getPassword()))
        .findFirst()
        .orElse(null);

    if (matchedUser != null) {
        return ResponseEntity.ok("Login successful");
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body("Invalid email or password");
    }
}
    }


// User:-
// /register_user 
// /login_user - send user object


// Admin:-
// /register_admin  - keep is_admin as true


