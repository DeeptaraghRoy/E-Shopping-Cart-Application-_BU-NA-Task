package com.capg.cartserviceservice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.client.RestTemplate;

import com.capg.cartserviceentity.Cart;
import com.capg.cartserviceentity.Items;
import com.capg.cartservicerepositories.CartRepository;
import com.capg.cartservicerepositories.ItemRepository;

import VO.Product;
import VO.ResponseTemplateVO;
@Service
public class CartService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ItemRepository crepo;
	
	@Autowired
	private CartRepository cartrepo;
	
	private Items item; 

	public List getProductwithCart() {
		
		Product[] product = restTemplate.getForObject("http://localhost:8084/product-service/product/allproducts" , Product[].class);
		List list= Arrays.asList(product);
		return list ;
	}

	public List getProductwithCartByName(String name) {
		Product[] product = restTemplate.getForObject("http://localhost:8084/product-service/product/getProductByName/"+name , Product[].class);
		List list= Arrays.asList(product);
		
		return list ;
	}

	public Items save(Items i) {
		
		return crepo.save(i);
		
	}

	public List<Items> getItemsByUserName(String usName) {
		
		return crepo.findItemsByUSerName(usName);
	}

	public void savecart() {
		// TODO Auto-generated method stub
		
	}

	public Cart saveC(Cart cart) {
		// TODO Auto-generated method stub
		return cartrepo.save(cart);
	}

	public void  delete(Items item2) {
		
		crepo.deleteById(item2.getProductId());
	}

	public List<Items> getItem(String name,String usName) {
		return crepo.findByName(name,usName);
		
	}
	
	public int testAuth(String token)
	{
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
		try {
		ResponseEntity<String> response = restTemplate.exchange(
		    "http://localhost:8084/profilejwt/", HttpMethod.GET, requestEntity, String.class, new ArrayList());
		
		
		return response.getStatusCodeValue();
		}
		catch(Exception e)
		{
			return 0;
		}
		
	}

	public Object testAuthViewProfile(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
		try {
		
		ResponseEntity response = restTemplate.exchange(
		    "http://localhost:8084/profilejwt/ViewProfile", HttpMethod.GET, requestEntity, String.class, new ArrayList());
		
		System.out.println(response);
		if(response.getStatusCodeValue()==200)
		return response.getBody();
		else
		return null;
		
		}
		catch(Exception e)
		{
			return null;
		}
	}

	public List<Cart> getCartByUserName(String usName) {
		List l=cartrepo.getCartByUserName(usName);
		return l;
	}

	

}
