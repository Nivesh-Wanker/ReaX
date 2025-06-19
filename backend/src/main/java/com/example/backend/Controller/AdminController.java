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
import com.example.backend.service.mapdtoUser;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AdminController {
    
    @Autowired
    TestDocRepository repo;

    @Autowired
    mapdtoUser service;

    @PostMapping("/add_admin")
        public void add_admin(@RequestBody admin_dto dto){
            service.addAdmin(dto);
        }
    
    @GetMapping("/getadmin")
    public List<Admin> getAll(){
        return repo.findAll();
    }

    @GetMapping("/getadmin/{id}")
     public void GetAdminById(@PathVariable String id){
        service.GetadminById(id);
    }
    @DeleteMapping("/delete/{id}")
     public String deleteById(@PathVariable String id){
        repo.deleteById(id);
        return "deleted";
     }
    }



