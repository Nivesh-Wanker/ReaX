package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.backend.dto.FormDto;
import com.example.backend.mapper.FormMapper;
import com.example.backend.model.Form;
import com.example.backend.repository.FormRepository;
import com.example.backend.service.FormService; 

@RestController
@CrossOrigin
public class FormController {
    
    @Autowired
    FormMapper formMapper;
    
    @Autowired
    FormService formService; 

    @Autowired
    FormRepository formRepo;
    
    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/form/create")
    public ResponseEntity<?> createForm(@jakarta.validation.Valid @RequestBody FormDto.FormRequestDto formdata) {
        try {
            System.out.println("formdata:"+formdata);
            // Convert DTO to entity
            Form form = formMapper.toEntity(formdata);
            // Save to database
            Form savedForm = formRepo.save(form);
            
            // Convert back to response DTO
            FormDto.FormResponseDto response = formMapper.toResponseDto(savedForm);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating form: " + e.getMessage());
        }
    }


    // WIP -- Nitin
    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/form/update")
    public ResponseEntity<?> updateForm(@jakarta.validation.Valid @RequestBody FormDto.FormRequestDto formdata) {
        try {
            // System.out.println("formdata:"+formdata);
            // // Convert DTO to entity
            // Form form = formMapper.toEntity(formdata);
            // // Save to database
            // Form savedForm = formRepo.save(form);
            
            // // Convert back to response DTO
            // FormDto.FormResponseDto response = formMapper.toResponseDto(savedForm);
            
            return ResponseEntity.ok("response");



        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating form: " + e.getMessage());
        }
    }
    
    // WIP -- Nitin
    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/form/{id}")
    public List<Form> fetchForm(@jakarta.validation.Valid @RequestBody String userId) {
        return formRepo.findPublishedFormsByUserId(userId);
    }

    
    
}
