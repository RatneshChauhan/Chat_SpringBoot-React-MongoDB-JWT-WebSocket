package com.example.websocketdemo.model;



public class UserMessageCount {

	private Sender sender;
	private int numberOfMessages;

	public int getNumberOfMessages() {
		return numberOfMessages;
	}

	public void setNumberOfMessages(int numberOfMessages) {
		this.numberOfMessages = numberOfMessages;
	}

	public Sender getSender() {
		return sender;
	}

	public void setSender(Sender sender) {
		this.sender = sender;
	}


	public UserMessageCount() {

	}

	public UserMessageCount(Sender sendr, int numberOfMessages) {
		this.sender = sendr;
		this.numberOfMessages = numberOfMessages;
	}
}
