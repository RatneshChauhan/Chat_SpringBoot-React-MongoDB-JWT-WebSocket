package com.example.websocketdemo.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.websocketdemo.model.ChatMessage;


@Repository
public interface MessageRepository  extends MongoRepository<ChatMessage, String> {

	@Query("{$and: [{$or: [{ from: ?0 }, { from: ?1 }]},{$or: [{ to: ?1 }, { to: ?0 }]}]}")
	List<ChatMessage> findByFromAndTo(String from, String to);
}
