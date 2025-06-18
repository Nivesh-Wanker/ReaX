package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection="admin")
@Data  // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor // No-args constructor
@AllArgsConstructor // All-args constructor
public class Admin {
    @Id
    private String id;  

    private String name;

    private String email;
    private String password;
    private String createdBy;

    private String updatedBy;
    private boolean isAdmin;
    // private list<forms> forms;

}