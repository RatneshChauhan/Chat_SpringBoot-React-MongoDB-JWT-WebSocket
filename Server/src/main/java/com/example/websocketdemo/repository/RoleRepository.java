package com.example.websocketdemo.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.websocketdemo.model.ERole;
import com.example.websocketdemo.model.Role;


public interface RoleRepository extends MongoRepository<Role, String> {
	
  Optional<Role> findByName(ERole name);
}
