package com.example.websocketdemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.websocketdemo.model.TestModel;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	
	@GetMapping("/home")
	public List<TestModel> allAccess() {

		List<TestModel> testList = new ArrayList<TestModel>();

        testList.add(new TestModel("SpringBoot", "REST APIs using Spring Web MVC & interacts with MongoDB Database using Spring Data MongoDB"));
        testList.add(new TestModel("React", "Client sends HTTP Requests and retrieve HTTP Responses using axios shows data on the components, React Router for navigating to pages"));
        testList.add(new TestModel("Visit", "https://github.com/RatneshChauhan"));
       
		return testList;
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
