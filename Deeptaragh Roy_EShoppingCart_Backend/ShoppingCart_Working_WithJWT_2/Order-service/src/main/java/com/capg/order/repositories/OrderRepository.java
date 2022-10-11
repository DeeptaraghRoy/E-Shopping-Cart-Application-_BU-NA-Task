package com.capg.order.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.capg.order.entity.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order,Integer> {

}
