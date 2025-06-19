package com.example.backend.dto;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String id;

    private String name;

    private String email;

    private String password;
}
