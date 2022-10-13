/**
 * 
 */
package com.example.websocketdemo.repository;

import org.springframework.stereotype.Repository;

import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.model.UserMessageCount;


/**
 * @author BCPTEST
 *
 */

@Repository
public interface CustomRepo {

	void pushMessages(ChatMessage mesg, String fromId, String toId);
	void pushUnreadMessages(Object receiverId, UserMessageCount mCount);
}
