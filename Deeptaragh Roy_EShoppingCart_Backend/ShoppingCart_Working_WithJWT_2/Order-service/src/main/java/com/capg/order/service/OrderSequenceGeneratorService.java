package com.capg.order.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


import com.capg.order.entity.OrderSequence;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

@Service
public class OrderSequenceGeneratorService {

	@Autowired
	private MongoOperations mongoOperations;

	public int getOrderSequenceNumber(String sequenceName) {
		// get sequence no
		Query query = new Query(Criteria.where("id").is(sequenceName));
		// update the sequence no
		Update update = new Update().inc("seq", 1);
		// modify in document
		OrderSequence counter = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				OrderSequence.class);

		return !Objects.isNull(counter) ? counter.getSeq() : 1;
	}
}