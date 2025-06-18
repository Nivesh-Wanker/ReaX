package com.example.backend.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.admin_dto;
import com.example.backend.model.Admin;
import com.example.backend.repository.TestDocRepository;

@Service
public class AdminService {
     @Autowired
    TestDocRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    

    public Admin mapDtoAdmin(admin_dto dto){
        Admin doc=new Admin();
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

    public ResponseEntity<String> addAdmin(admin_dto dto){
            Admin doc= mapDtoAdmin(dto);
            repo.save(doc);
            return ResponseEntity.ok("Admin added successfully");
    }

}
