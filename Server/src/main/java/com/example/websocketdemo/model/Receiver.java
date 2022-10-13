/**
 * 
 */
package com.example.websocketdemo.model;

/**
 * @author BCPTEST
 *
 */
public class Receiver {

	private String _id;
	private String email;
	private String status;
	private String username;

	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
}
