package com.example.websocketdemo.request;

import java.util.Set;

import javax.validation.constraints.*;

public class SignupRequest {

	@NotBlank
	@Size(min = 3, max = 20 , message="Email should be between 3 and 20 character ")
	@Email
	private String email;

	private Set<String> roles;

	@NotBlank
	@Size(min = 6, max = 33, message="Password should be between 6 and 33 characters")
	private String password;

	private String phone;

	private String username;



	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRoles() {
		return this.roles;
	}

	public void setRole(Set<String> roles) {
		this.roles = roles;
	}
}
