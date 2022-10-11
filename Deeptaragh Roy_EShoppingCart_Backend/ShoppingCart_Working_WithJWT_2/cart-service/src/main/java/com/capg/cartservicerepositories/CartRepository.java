package com.capg.cartservicerepositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capg.cartserviceentity.Cart;
import com.capg.cartserviceentity.Items;
@Repository
public interface CartRepository extends MongoRepository<Cart,Integer> {

	
	
	@Query("{'username' : :#{#name}}")
	public List<Cart> getCartByUserName(@Param("name") String usName);

}
