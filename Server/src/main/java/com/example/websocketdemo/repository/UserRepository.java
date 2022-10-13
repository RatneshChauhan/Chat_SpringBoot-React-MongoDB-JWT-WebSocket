/**
 * 
 */
package com.example.websocketdemo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.websocketdemo.model.User;

/**
 * @author BCPTEST
 *
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

	List<User> findAll();

	Optional<User> findById(String id);

	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
