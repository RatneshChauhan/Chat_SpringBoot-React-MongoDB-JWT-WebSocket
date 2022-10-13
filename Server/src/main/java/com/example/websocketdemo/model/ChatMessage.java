package com.example.websocketdemo.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "conversations")
public class ChatMessage {

	private MessageType type;
	private String from;
	private String to;

	private Receiver receiver;
	private Sender sender;
	private Message newMessage;

	private String unformattedDate;
	private String formattedDate;
	
	private List <Message> messages;
	private List<UserMessageCount> unreadMessage = new ArrayList<UserMessageCount>();

	public String getUnformattedDate() {
		return unformattedDate;
	}
	public void setUnformattedDate(String unformattedDate) {
		this.unformattedDate = unformattedDate;
	}

	public Message getNewMessage() {
		return newMessage;
	}

	public void setNewMessage(Message newMessage) {
		this.newMessage = newMessage;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public Receiver getReceiver() {
		return receiver;
	}

	public void setReceiver(Receiver receiver) {
		this.receiver = receiver;
	}

	public Sender getSender() {
		return sender;
	}

	public void setSender(Sender sender) {
		this.sender = sender;
	}

	public MessageType getType() {
		return type;
	}

	public void setType(MessageType type) {
		this.type = type;
	}

	public List<UserMessageCount> getUnreadMessage() {
		return unreadMessage;
	}

	public void setUnreadMessage(List<UserMessageCount> unreadMessage) {
		this.unreadMessage = unreadMessage;
	}
	
	public String getFormattedDate() {
		return formattedDate;
	}
	public void setFormattedDate(String formattedDate) {
		this.formattedDate = formattedDate;
	}

	public enum MessageType {
		CHAT,
		JOIN,
		LEAVE,
		TYPING
	}
}
