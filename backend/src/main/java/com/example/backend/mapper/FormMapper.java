package com.example.backend.mapper;

import com.example.backend.model.Form;
import com.example.backend.dto.FormDto;
import org.springframework.stereotype.Component;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Component
public class FormMapper {
    
    private static final DateTimeFormatter DATE_FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public Form toEntity(FormDto.FormRequestDto dto) {
        Form form = new Form();
        form.setUserId(dto.getUserId());
        form.setCurrentVersion(1);
        form.setVersions(new ArrayList<>()); // FIXED: Explicit initialization
        
        // Create first version
        Form.FormVersion version = new Form.FormVersion();
        version.setVersionNumber(1);
        version.setVersionStatus("DRAFT");
        version.setCreatedAt(LocalDateTime.now());
        version.setActive(true);
        version.setFields(new ArrayList<>()); // FIXED: Initialize
        version.setResponses(new ArrayList<>()); // FIXED: Initialize
        
        // Map meta
        Form.FormMeta meta = new Form.FormMeta();
        meta.setTitle(dto.getMeta().getTitle());
        meta.setDescription(dto.getMeta().getDescription());
        version.setMeta(meta);
        
        // Map fields
        if (dto.getFields() != null) { // FIXED: Null check
            version.setFields(dto.getFields().stream()
                .map(fieldDto -> {
                    Form.FormField field = new Form.FormField();
                    field.setId(fieldDto.getId());
                    field.setLabel(fieldDto.getLabel());
                    field.setType(fieldDto.getType());
                    field.setOptions(fieldDto.getOptions() != null ? 
                        fieldDto.getOptions() : new ArrayList<>());
                    field.setRequired(fieldDto.isRequired());
                    return field;
                })
                .collect(Collectors.toList()));
        }
        
        form.getVersions().add(version);
        return form;
    }
    
    public FormDto.FormResponseDto toResponseDto(Form form) {
        FormDto.FormResponseDto dto = new FormDto.FormResponseDto();
        dto.setId(form.getId());
        dto.setUserId(form.getUserId());
        // dto.setFormTitle(form.getFormTitle());
        // dto.setFormDescription(form.getFormDescription());
        // dto.setStatus(form.getStatus());
        dto.setCurrentVersion(form.getCurrentVersion());
        dto.setCreatedAt(form.getCreatedAt() != null ? 
            form.getCreatedAt().format(DATE_FORMATTER) : null);
        dto.setUpdatedAt(form.getUpdatedAt() != null ? 
            form.getUpdatedAt().format(DATE_FORMATTER) : null);
        
        // Map versions with null checks
        if (form.getVersions() != null) {
            dto.setVersions(form.getVersions().stream()
                .map(version -> {
                    FormDto.FormResponseDto.FormVersionDto versionDto = 
                        new FormDto.FormResponseDto.FormVersionDto();
                    versionDto.setVersionNumber(version.getVersionNumber());
                    versionDto.setVersionStatus(version.getVersionStatus());
                    versionDto.setCreatedAt(version.getCreatedAt() != null ? 
                        version.getCreatedAt().format(DATE_FORMATTER) : null);
                    versionDto.setActive(version.isActive());
                    versionDto.setResponseCount(version.getResponses() != null ? 
                        version.getResponses().size() : 0);
                    
                    // Map meta
                    FormDto.FormResponseDto.FormMetaDto metaDto = 
                        new FormDto.FormResponseDto.FormMetaDto();
                    if (version.getMeta() != null) {
                        metaDto.setTitle(version.getMeta().getTitle());
                        metaDto.setDescription(version.getMeta().getDescription());
                    }
                    versionDto.setMeta(metaDto);
                    
                    // Map fields
                    if (version.getFields() != null) {
                        versionDto.setFields(version.getFields().stream()
                            .map(field -> {
                                FormDto.FormResponseDto.FormFieldDto fieldDto = 
                                    new FormDto.FormResponseDto.FormFieldDto();
                                fieldDto.setId(field.getId());
                                fieldDto.setLabel(field.getLabel());
                                fieldDto.setType(field.getType());
                                fieldDto.setOptions(field.getOptions());
                                fieldDto.setRequired(field.isRequired());
                                return fieldDto;
                            })
                            .collect(Collectors.toList()));
                    }
                    
                    return versionDto;
                })
                .collect(Collectors.toList()));
        }
        
        return dto;
    }
    
    public FormDto.FormSummaryDto toSummaryDto(Form form) {
        FormDto.FormSummaryDto dto = new FormDto.FormSummaryDto();
        dto.setId(form.getId());
        dto.setTitle(form.getFormTitle());
        dto.setDescription(form.getFormDescription());
        // dto.setStatus(form.getStatus());
        dto.setCurrentVersion(form.getCurrentVersion());
        dto.setTotalVersions(form.getVersions() != null ? form.getVersions().size() : 0);
        
        // Calculate total responses across all versions with null checks
        int totalResponses = 0;
        if (form.getVersions() != null) {
            totalResponses = form.getVersions().stream()
                .mapToInt(version -> version.getResponses() != null ? 
                    version.getResponses().size() : 0)
                .sum();
        }
        dto.setTotalResponses(totalResponses);
        
        dto.setCreatedAt(form.getCreatedAt() != null ? 
            form.getCreatedAt().format(DATE_FORMATTER) : null);
        dto.setUpdatedAt(form.getUpdatedAt() != null ? 
            form.getUpdatedAt().format(DATE_FORMATTER) : null);
        
        return dto;
    }
    
    public Form.FormVersion createNewVersion(Form existingForm, FormDto.FormRequestDto dto) {
        Form.FormVersion newVersion = new Form.FormVersion();
        newVersion.setVersionNumber(existingForm.getCurrentVersion() + 1);
        newVersion.setVersionStatus("DRAFT");
        newVersion.setCreatedAt(LocalDateTime.now());
        newVersion.setActive(false);
        newVersion.setFields(new ArrayList<>()); // FIXED: Initialize
        newVersion.setResponses(new ArrayList<>()); // FIXED: Initialize
        
        // Map meta
        Form.FormMeta meta = new Form.FormMeta();
        meta.setTitle(dto.getMeta().getTitle());
        meta.setDescription(dto.getMeta().getDescription());
        newVersion.setMeta(meta);
        
        // Map fields with null checks
        if (dto.getFields() != null) {
            newVersion.setFields(dto.getFields().stream()
                .map(fieldDto -> {
                    Form.FormField field = new Form.FormField();
                    field.setId(fieldDto.getId());
                    field.setLabel(fieldDto.getLabel());
                    field.setType(fieldDto.getType());
                    field.setOptions(fieldDto.getOptions() != null ? 
                        fieldDto.getOptions() : new ArrayList<>());
                    field.setRequired(fieldDto.isRequired());
                    return field;
                })
                .collect(Collectors.toList()));
        }
        
        return newVersion;
    }
}