/**
 * 
 */
package com.example.websocketdemo.model;


/**
 * @author BCPTEST
 *
 */
public class Message {

	private String text;
	private String ts; // formatted date
	private boolean seen;
	
	public String getTs() {
		return ts;
	}
	public void setTs(String ts) {
		this.ts = ts;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}

	public boolean isSeen() {
		return seen;
	}
	public void setSeen(boolean seen) {
		this.seen = seen;
	}
}
