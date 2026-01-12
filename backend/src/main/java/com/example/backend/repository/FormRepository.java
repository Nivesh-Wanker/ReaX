package com.example.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.backend.model.Form;

@Repository
public interface FormRepository extends MongoRepository<Form, String> {
    
    // Find forms by user
    List<Form> findByUserId(String userId);
    
    // Find forms by user and status
    // List<Form> findByUserIdAndStatus(String userId, String status);
    
    // Find form by ID and specific version
    @Query("{ '_id': ?0, 'versions.version_number': ?1 }")
    Optional<Form> findByIdAndVersionNumber(String formId, Integer versionNumber);
    
    // Find forms by title (case insensitive)
    @Query("{ 'form_title': { $regex: ?0, $options: 'i' } }")
    List<Form> findByFormTitleContainingIgnoreCase(String title);
    
    // Count forms by user
    Long countByUserId(String userId);
    
    // Find published forms only
    @Query("{ 'user_id': ?0, 'versions.versionStatus': 'PUBLISHED' }")
    List<Form> findPublishedFormsByUserId(String userId);
    
    // Find forms with active versions
    @Query("{ 'user_id': ?0, 'versions.is_active': true }")
    List<Form> findFormsWithActiveVersions(String userId);
}