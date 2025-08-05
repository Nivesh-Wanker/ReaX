package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "forms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Form {
    @Id
    private String id;
    
    @Field("user_id")
    private String userId;
    
    // @Field("form_status")
    // private String status; // DRAFT, PUBLISHED, ARCHIVED
    
    @Field("current_version")
    private Integer currentVersion = 1;
    
    @Field("form_versions")
    private List<FormVersion> versions = new ArrayList<>(); // FIXED: Initialize in constructor

    // FIXED: Custom constructor to properly initialize lists
    public Form(String userId, String formTitle, String formDescription) {
        this.userId = userId;
        // this.status = "DRAFT";
        this.currentVersion = 1;
        this.versions = new ArrayList<>();
    }

    // Form Version
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormVersion {
        @Field("version_number")
        private Integer versionNumber;
        
        @Field("form_meta")
        private FormMeta meta;
        
        @Field("form_fields")
        private List<FormField> fields = new ArrayList<>(); // FIXED: Initialize
        
        @Field("version_status")
        private String versionStatus; // DRAFT, PUBLISHED, INACTIVE
        
        @Field("created_at")
        private LocalDateTime createdAt;

        @Field("is_active")
        private boolean isActive = false;
        
        @Field("responses")
        private List<FormResponse> responses = new ArrayList<>(); // FIXED: Initialize
        
        // FIXED: Custom constructor
        public FormVersion(Integer versionNumber, FormMeta meta, String versionStatus) {
            this.versionNumber = versionNumber;
            this.meta = meta;
            this.versionStatus = versionStatus;
            this.createdAt = LocalDateTime.now();
            this.isActive = false;
            this.fields = new ArrayList<>();
            this.responses = new ArrayList<>();
        }
    }
    
    // Form Metadata
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormMeta {
        @Field("form_title") // FIXED: Consistent field naming
        private String title;

        @Field("form_description") // FIXED: Consistent field naming
        private String description;
    }
    
    // Form Fields
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormField {
        @Field("field_id") // FIXED: Add field mapping
        private Long id; 
        
        @Field("field_label") // FIXED: Add field mapping
        private String label;
        
        @Field("field_type") // FIXED: Add field mapping
        private String type;
        
        @Field("field_options") // FIXED: Add field mapping
        private List<String> options = new ArrayList<>(); // FIXED: Initialize
        
        @Field("is_required")
        private boolean isRequired;
        
        // FIXED: Custom constructor
        public FormField(Long id, String label, String type, List<String> options, boolean isRequired) {
            this.id = id;
            this.label = label;
            this.type = type;
            this.options = options != null ? options : new ArrayList<>();
            this.isRequired = isRequired;
        }
    }

    // Form Responses
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormResponse {
        @Field("response_id")
        private String responseId;
        
        @Field("respondent_email")
        private String respondentEmail;
        
        @Field("respondent_name")
        private String respondentName;
        
        @Field("field_responses")
        private List<FieldResponse> fieldResponses = new ArrayList<>(); // FIXED: Initialize
        
        @Field("submitted_at")
        private LocalDateTime submittedAt;
        
        @Field("completion_time_seconds")
        private Long completionTimeSeconds;
        
        @Field("ip_address")
        private String ipAddress;
    }
    
    // Field Response
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FieldResponse {
        @Field("field_id")
        private Long fieldId;
        
        @Field("field_label")
        private String fieldLabel;
        
        @Field("field_type")
        private String fieldType;
        
        @Field("response_value")
        private Object responseValue;
    }
}
