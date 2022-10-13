package com.example.websocketdemo.controller;


import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.model.Message;
import com.example.websocketdemo.model.Sender;
import com.example.websocketdemo.model.User;
import com.example.websocketdemo.model.UserMessageCount;
import com.example.websocketdemo.repository.CustomRepoImpl;
import com.example.websocketdemo.repository.UserRepository;
import com.example.websocketdemo.util.DateUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;



@Controller
public class ChatController {

	@Autowired
	CustomRepoImpl customRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;


	/*--------------------Private chat--------------------*/
	@MessageMapping("/privateEvent")
	public void sendPrivateMessage(@Payload ChatMessage chatMessage) {


		this.handleSocketEvents(chatMessage);

		simpMessagingTemplate.convertAndSendToUser(chatMessage.getReceiver().getUsername().trim(), "/private", this.formatMessage(chatMessage));
	}

	@MessageMapping("/publicEvent")
	@SendTo("/topic/pubic")
	public ChatMessage login(@Payload ChatMessage chatMessage,
			SimpMessageHeaderAccessor headerAccessor) {
		this.handleSocketEvents(chatMessage);
		return chatMessage;
	}

	private void handleSocketEvents (ChatMessage chatMessage) {

		System.out.println(chatMessage.getType());

		switch(chatMessage.getType())
		{
		case JOIN:
			chatMessage.setUnformattedDate(DateUtil.UNFORMATTED_CUR_DATE());
			chatMessage.setFormattedDate(DateUtil.FORMATTED_CUR_DATE());
			this.setUnreadMessage(chatMessage,false);
			break;
		case CHAT: 
			this.saveMessage(chatMessage, chatMessage.getFrom(), chatMessage.getTo());	
			this.setUnreadMessage(chatMessage, true);
			break;
		case LEAVE:
			chatMessage.setFormattedDate(DateUtil.FORMATTED_CUR_DATE());
			chatMessage.setUnformattedDate(DateUtil.UNFORMATTED_CUR_DATE());
			break;
		case TYPING: 
			break;
		default:
			break;
		}
	}

	private String saveMessage(ChatMessage chatMessage, String fromId, String toId) {
		customRepository.pushMessages(chatMessage, fromId, toId);
		return "Message Saved!";
	}	
	private ChatMessage formatMessage(ChatMessage chatMessage) {
		List<Message> l = new ArrayList<Message>();
		l.add(chatMessage.getNewMessage());
		chatMessage.setMessages(l);
		return chatMessage;
	}
	private ChatMessage setUnreadMessage(ChatMessage chatMessage,boolean isChat) {

		if(isChat) {

			Optional<User> messageReceiver = userRepository.findById(chatMessage.getReceiver().get_id());
			User receiverData = messageReceiver.get();

			if (messageReceiver.isPresent()) {

				Sender messageSender = new Sender();
				messageSender.setEmail(chatMessage.getSender().getEmail());
				messageSender.setId(chatMessage.getSender().getId());
				messageSender.setUsername(chatMessage.getSender().getUsername());

				UserMessageCount unreadMessage  = receiverData.getUnreadMessages().stream()
						.filter(ussr -> chatMessage.getSender().getId().equals(ussr.getSender().getId()))
						.findAny()
						.orElse(new UserMessageCount());

				unreadMessage.setSender(messageSender);
				unreadMessage.setNumberOfMessages(unreadMessage.getNumberOfMessages()+1);

				chatMessage.setUnreadMessage(receiverData.getUnreadMessages());

				customRepository.pushUnreadMessages(receiverData.get_id(), unreadMessage);
			}
		}
		else {
			Optional<User> existingData = userRepository.findById(chatMessage.getSender().getId());
			User you = existingData.get();
			chatMessage.setUnreadMessage(you.getUnreadMessages());

		}


		return chatMessage;
	}
}	
