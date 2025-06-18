package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Admin;

@Repository
public interface TestDocRepository extends MongoRepository<Admin, String> {

}
