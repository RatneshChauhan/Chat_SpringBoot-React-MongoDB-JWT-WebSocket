/**
 * 
 */
package com.example.websocketdemo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.websocket.util.ObjectMapperUtils;
import com.example.websocketdemo.dto.MessageDTO;
import com.example.websocketdemo.dto.UserDTO;
import com.example.websocketdemo.repository.MessageRepository;
import com.example.websocketdemo.repository.UserRepository;

/**
 * @author BCPTEST
 *
 */

@RestController
@RequestMapping("/api/get/data/mongo/")
public class LoadDataController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MessageRepository msgRepository;

	@GetMapping(value = "users")
	@CrossOrigin(origins = "http://localhost:3000")
	@PreAuthorize("hasRole('USER')")
	public List<UserDTO> getAllUsers() {
		System.out.println("***-Getting All Users***-");
		return ObjectMapperUtils.mapAll(userRepository.findAll(), UserDTO.class);
	}

	@GetMapping(value = "conversation")
	@CrossOrigin(origins = "http://localhost:3000")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public List<MessageDTO> getMessagesForUser(@RequestParam String fromId,@RequestParam String toId) {
		System.out.println("***-Getting Conversation fromId***-"+fromId+" toId: "+toId);
		return ObjectMapperUtils.mapAll(msgRepository.findByFromAndTo(fromId, toId), MessageDTO.class);
	}

}
