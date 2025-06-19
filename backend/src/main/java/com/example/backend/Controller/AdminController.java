package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.UserDto;
import com.example.backend.service.AdminService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AdminController {



    @Autowired
    AdminService service;

         @PostMapping("/addadmin")
        public void Createadmin(@RequestBody UserDto dto){
            service.addAdmin(dto);
        }
}
