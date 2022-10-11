package com.capg.cartservicerepositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capg.cartserviceentity.Items;


@Repository
public interface ItemRepository extends MongoRepository<Items,Integer> {

	@Query("{'productName' : :#{#name}},{'username' : :#{#usName}}")
    public List<Items> findByName(@Param("name") String name,@Param("usname") String usName);

	
	@Query("{'username' : :#{#name}}")
	public List<Items> findItemsByUSerName(@Param("name") String name);


	

}
