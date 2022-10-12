package com.example.websocketdemo.request;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
	@NotBlank(message="Please enter your email ")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@NotBlank(message="Please enter your password ")
	private String password;

	

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
