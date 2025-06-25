package com.example.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import com.example.backend.model.Form;


public interface FormRepository extends MongoRepository<Form, String> {
    List<Form> findByUserId(String userId);
}