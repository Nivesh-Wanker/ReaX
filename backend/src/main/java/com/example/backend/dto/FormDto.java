// ========================= FIXED FORMDTO =========================

package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

public class FormDto {
    
    // Request DTO for creating/updating forms
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormRequestDto { 
        @Valid
        @NotNull(message = "Form metadata is required")
        private FormMetaDto meta;
        
        @Valid
        @NotNull(message = "Form fields are required")
        private List<FormFieldDto> fields;

        private String userId;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FormMetaDto {
            @NotBlank(message = "Form title is required")
            private String title;
            private String description;
        }
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FormFieldDto {
            @NotNull(message = "Field ID is required")
            private Long id;
            
            @NotBlank(message = "Field label is required")
            private String label;
            
            @NotBlank(message = "Field type is required")
            private String type;
            
            private List<String> options;
            private boolean isRequired;
        }
    }

    // Response DTO for returning form data with versions
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormResponseDto { // FIXED: Made static
        private String id;
        private String userId;
        private String formTitle;
        private String formDescription;
        private String status;
        private Integer currentVersion;
        private List<FormVersionDto> versions;
        private String createdAt;
        private String updatedAt;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FormVersionDto {
            private Integer versionNumber;
            private FormMetaDto meta;
            private List<FormFieldDto> fields;
            private String versionStatus;
            private String createdAt;
            private boolean isActive;
            private Integer responseCount;
        }
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FormMetaDto {
            private String title;
            private String description;
        }
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FormFieldDto {
            private Long id;
            private String label;
            private String type;
            private List<String> options;
            private boolean isRequired;
        }
    }

    // DTO for form responses submission
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormSubmissionDto { // FIXED: Made static
        private String formId;
        private Integer versionNumber;
        private String respondentEmail;
        private String respondentName;
        private List<FieldResponseDto> fieldResponses;
        private Long completionTimeSeconds;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FieldResponseDto {
            private Long fieldId;
            private Object responseValue; // String, List<String>, Number, Boolean
        }
    }

    // DTO for viewing responses with analytics
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormAnalyticsDto { // FIXED: Made static
        private String formId;
        private String formTitle;
        private Integer versionNumber;
        private Integer totalResponses;
        private Double averageCompletionTime;
        private String lastResponseAt;
        private List<FieldAnalyticsDto> fieldAnalytics;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FieldAnalyticsDto {
            private Long fieldId;
            private String fieldLabel;
            private String fieldType;
            private Integer responseCount;
            private Object mostCommonResponse;
            private List<ResponseBreakdownDto> responseBreakdown;
        }
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class ResponseBreakdownDto {
            private String option;
            private Integer count;
            private Double percentage;
        }
    }

    // DTO for listing forms (summary view)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormSummaryDto { // FIXED: Made static
        private String id;
        private String title;
        private String description;
        private String status;
        private Integer currentVersion;
        private Integer totalVersions;
        private Integer totalResponses;
        private String createdAt;
        private String updatedAt;
    }
}
