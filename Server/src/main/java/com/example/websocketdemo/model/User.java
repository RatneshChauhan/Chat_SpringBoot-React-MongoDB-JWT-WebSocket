package com.example.websocketdemo.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class User {

	@Id private ObjectId _id;

	private String id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank (message = "status can be either online or offline but cannot be blank")
	private String status;

	@NotBlank
	private String phone;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;

	@DBRef
	private Set<Role> roles = new HashSet<>();

	private List<UserMessageCount> unreadMessages = new ArrayList<UserMessageCount>();

	public User() {}

	public User(String username, String email, String password, String phone, String status, List<UserMessageCount> unreadMessages) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.status = status;
		this.unreadMessages = unreadMessages;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public List<UserMessageCount> getUnreadMessages() {
		return unreadMessages;
	}

	public void setUnreadMessages(List<UserMessageCount> unreadMessages) {
		this.unreadMessages = unreadMessages;
	}
}
