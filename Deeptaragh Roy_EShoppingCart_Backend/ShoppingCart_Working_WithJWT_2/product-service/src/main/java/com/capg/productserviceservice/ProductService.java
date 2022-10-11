package com.capg.productserviceservice;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.capg.productservice.entity.Product;
import com.capg.productservice.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository prepo;
	
	@Autowired
	private RestTemplate restTemplate;

	public Product addProducts(Product product) {
		prepo.save(product);
		return product;
	}

	public void deleteById(int id) {
		prepo.deleteById(id);

	}
	
	public Object getAll() {	
		return prepo.findAll();
	}
	
	public Optional<Product> findById(int id) {
		return prepo.findById(id);
	}
	
	public List<Product> findByName(String name) {
		return prepo.findByName(name);
	}
	
	public List<Product> findByCategory(String cat) {
		return prepo.findByCategory(cat);
	}

	public boolean testAuthAdmiin(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
		try {
		ResponseEntity<String> response = restTemplate.exchange(
		    "http://localhost:8084/profilejwt/VerifyAdmin", HttpMethod.GET, requestEntity, String.class, new ArrayList());
		System.out.println(response.getBody().toString());
		if(response.getStatusCodeValue()==200&&response.getBody().toString().equals("true"))
			return true;
		else
			return false;
		}
		catch(Exception e)
		{
			return false;
		}
	}

}
