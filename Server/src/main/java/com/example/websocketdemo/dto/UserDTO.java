/**
 * 
 */
package com.example.websocketdemo.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.websocketdemo.model.UserMessageCount;

/**
 * @author BCPTEST
 *
 */
public class UserDTO {

	private String id;
	private String _id;
	private String username;
	private String description;
	private String email;
	private String password;
	private String status;
	private String createdAt;
	private List<UserMessageCount> unreadMessages ;
	

	public List<UserMessageCount> getUnreadMessages() {
		return unreadMessages;
	}

	public void setUnreadMessages(List<UserMessageCount> unreadMessages) {
		this.unreadMessages = unreadMessages;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public UserDTO() {
	}

	public UserDTO(String id, String _id, String username, String description, String email,
			String password, String status) {
		this.id = id;
		this._id = _id;
		this.username = username;
		this.description = description;
		this.email = email;
		this.password = password;
		this.status = status;
	}

}
