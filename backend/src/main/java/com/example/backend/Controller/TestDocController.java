package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.admin_dto;
import com.example.backend.model.TestDoc;
import com.example.backend.repository.TestDocRepository;
import com.example.backend.service.mapdtoUser;

@RestController
public class TestDocController {
    
    @Autowired
    TestDocRepository repo;

    @Autowired
    mapdtoUser service;

    @PostMapping("/add_admin")
        public ResponseEntity<String> add_admin(@RequestBody admin_dto dto){
            TestDoc doc=service.mapDtoUser(dto);
            repo.save(doc);
            return ResponseEntity.ok("Admin added successfully");
        }
    
    @GetMapping("/getadmin")
    public List<TestDoc> getAll(){
        return repo.findAll();
    }

    @GetMapping("/getadmin/{id}")
     public ResponseEntity<TestDoc> GetAdminById(@PathVariable String id){
        return repo.findById(id)
               .map(ResponseEntity::ok)          // → 200 OK with the TestDoc JSON
               .orElse(ResponseEntity.notFound() // → 404 if id not present
                                        .build());
    }
    @DeleteMapping("/delete/{id}")
     public String deleteById(@PathVariable String id){
        repo.deleteById(id);
        return "deleted";
     }
    }



