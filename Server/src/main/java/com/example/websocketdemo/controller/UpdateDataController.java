/**
 * 
 */
package com.example.websocketdemo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.websocketdemo.model.User;
import com.example.websocketdemo.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


/**
 * @author BCPTEST
 *
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/post/data/mongo/")
public class UpdateDataController {

	@Autowired
	private UserRepository userRepository;


	@PostMapping("/update/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<User> updateUser(@RequestBody User reQUser) {

		Optional<User> dbUser = userRepository.findById(reQUser.get_id().toString());
		if (dbUser.isPresent()) {
			User user = dbUser.get();
			user.setStatus(reQUser.getStatus());
			//user.setUnreadMessage(reQUser.getUnreadMessage());
			return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
