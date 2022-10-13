/**
 * 
 */
package com.example.websocketdemo.model;

import java.util.List;

/**
 * @author ratneshc
 *
 */
public class TestModel {

	private String title;
	private String description;
	private String link;
	private String name;
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public TestModel(String title, String desc) {
		this.title = title;
		this.description = desc;
	}
}
