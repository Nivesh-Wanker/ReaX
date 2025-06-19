package com.example.backend.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@Service
public class AdminService {
    @Autowired
    UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    

    public User mapDtoAdmin(UserDto dto){
        User doc=new User();
        doc.setId(UUID.randomUUID().toString());
        doc.setName(dto.getName());
        doc.setEmail(dto.getEmail());
        doc.setAdmin(true);
        String encryptedPassword = passwordEncoder.encode(dto.getPassword());
        doc.setPassword(encryptedPassword);
        doc.setCreatedBy(dto.getName());
        doc.setUpdatedBy(dto.getName());
        return doc;
    }

    public ResponseEntity<String> addAdmin(UserDto dto){
            User doc= mapDtoAdmin(dto);
            repo.save(doc);
            return ResponseEntity.ok("Admin added successfully");
    }

}
