/**
 * 
 */
package com.example.websocketdemo.dto;

import java.util.List;


/**
 * @author BCPTEST
 *
 */
public class MessageDTO {

	private List messages;
	private String from;
	private String to;


	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}



	public List getMessages() {
		return messages;
	}

	public void setMessages(List messages) {
		this.messages = messages;
	}


	public MessageDTO() {}

	public MessageDTO(List messages, String from, String to ) {
		this.messages = messages;
		this.from = from;
		this.to = to;

	}
}
