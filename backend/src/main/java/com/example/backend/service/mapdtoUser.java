package com.example.backend.service;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.backend.dto.admin_dto;
import com.example.backend.model.Admin;
import com.example.backend.repository.TestDocRepository;
    @Service
    public class mapdtoUser{
    
    @Autowired
    TestDocRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Admin mapDtoUser(admin_dto dto){
        Admin doc=new Admin();
        doc.setId(UUID.randomUUID().toString());
        doc.setName(dto.getName());
        doc.setEmail(dto.getEmail());
        String encryptedPassword = passwordEncoder.encode(dto.getPassword());
        doc.setPassword(encryptedPassword);
        doc.setCreatedBy(dto.getName());
        doc.setUpdatedBy(dto.getName());
        return doc;
    }
    public ResponseEntity<String> addAdmin(admin_dto dto){
            Admin doc= mapDtoUser(dto);
            repo.save(doc);
            return ResponseEntity.ok("Admin added successfully");
    }
    public ResponseEntity<Admin> GetadminById(@PathVariable String id){
        return repo.findById(id)
               .map(ResponseEntity::ok)          // → 200 OK with the TestDoc JSON
               .orElse(ResponseEntity.notFound() // → 404 if id not present
                                        .build());
    }
}
