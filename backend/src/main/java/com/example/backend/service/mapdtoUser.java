package com.example.backend.service;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.admin_dto;
import com.example.backend.model.TestDoc;
    @Service
    public class mapdtoUser{

        @Autowired
        private BCryptPasswordEncoder passwordEncoder;

    public TestDoc mapDtoUser(admin_dto dto){
        TestDoc doc=new TestDoc();
        doc.setId(UUID.randomUUID().toString());
        doc.setName(dto.getName());
        doc.setEmail(dto.getEmail());
        String encryptedPassword = passwordEncoder.encode(dto.getPassword());
        doc.setPassword(encryptedPassword);
        doc.setCreatedBy(dto.getName());
        doc.setUpdatedBy(dto.getName());
        return doc;
    }
}
