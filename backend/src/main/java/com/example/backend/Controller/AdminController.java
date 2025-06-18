package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.admin_dto;
import com.example.backend.service.AdminService;

@RestController
public class AdminController {



    @Autowired
    AdminService service;

         @PostMapping("/addadmin")
        public void add_admin(@RequestBody admin_dto dto){
            service.addAdmin(dto);
        }
}
