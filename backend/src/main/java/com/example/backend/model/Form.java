package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "forms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Form {
    @Id
    private String id;
    private String userId;
    private String title;
    private String status;
    private int responseCount;
    private LocalDateTime createdAt;
    
}