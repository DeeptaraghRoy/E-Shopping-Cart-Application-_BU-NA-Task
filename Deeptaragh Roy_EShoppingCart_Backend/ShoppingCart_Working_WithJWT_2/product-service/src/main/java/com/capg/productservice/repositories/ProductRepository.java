package com.capg.productservice.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capg.productservice.entity.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, Integer> {
	
	@Query("{'productName' : :#{#name}}")
    public List<Product> findByName(@Param("name") String name);
	
	@Query("{'category' : :#{#cat}}")
    public List<Product> findByCategory(@Param("cat") String cat);

}
