package com.example.backend.dto;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataDto {
    private int totalForms;
    private int totalResponses;
    private int activeForms;
    private List<FormSummary> forms;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormSummary {
        private String id;
        private String title;
        private String status;
        private int responses;
        private String createdAt;
        
    }

    
}