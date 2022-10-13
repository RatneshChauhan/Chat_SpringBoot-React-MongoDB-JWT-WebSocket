/**
 * 
 */
package com.example.websocketdemo.repository;


import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.model.User;
import com.example.websocketdemo.model.UserMessageCount;
import com.example.websocketdemo.util.DateUtil;




/**
 * @author BCPTEST
 *
 */
@Service
public class CustomRepoImpl implements CustomRepo  {

	@Autowired
	protected MongoTemplate mongoTemplate;


	@Override
	public void pushMessages(ChatMessage mesg, String fromId, String toId) {

		this.createCollectionIfNotExixts();

		mesg.getNewMessage().setTs(DateUtil.FORMATTED_CUR_DATE());

		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(mesg.getReceiver().get_id()));
		Update update = new Update();
		update.set("from", fromId);
		update.set("to", toId);
		update.set("sender", mesg.getSender());
		update.set("receiver", mesg.getReceiver());
		update.push("messages", mesg.getNewMessage());
		mongoTemplate.upsert(query, update, ChatMessage.class);

	}

	private void createCollectionIfNotExixts() {

		if (!mongoTemplate.getCollectionNames().contains("conversations")) {
			mongoTemplate.createCollection("conversations");

		}
		//mongoTemplate.dropCollection("conversations");	
	}


	@Override
	public void pushUnreadMessages(Object receiverId, UserMessageCount mCount) {

		Criteria c;
		Query query;
		Update update;

		if(mCount.getNumberOfMessages() == 1) { // Very first message, do push
			query = new Query(Criteria.where("_id").is(receiverId));
			update= new Update().push("unreadMessages", mCount);
		}
		else { // Subsequent messages, do set
			c = new Criteria().andOperator(Criteria.where("_id").is(receiverId),
					Criteria.where("unreadMessages.sender.email").is(mCount.getSender().getEmail()));
			query = new Query(c);
			update= new Update().set("unreadMessages.$.numberOfMessages", mCount.getNumberOfMessages());
		}

		mongoTemplate.upsert(query, update, User.class);
	}
}
