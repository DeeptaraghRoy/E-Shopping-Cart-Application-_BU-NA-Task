package com.capg.order.service;

import java.time.LocalDateTime;
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

import com.capg.order.entity.Order;
import com.capg.order.repositories.OrderRepository;


import VO.Address;
import VO.Cart;
import VO.Items;
import VO.Profile;


@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orepo;

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private OrderSequenceGeneratorService orSeqGenService;

	public List placeOrder(String token,String payMode) {
		
		//200,[{"catrId":1,"totalPrice":128614.96,"username":"rick200@gmail.com"}],[transfer-encoding:"chunked", Content-Type:"application/json", Date:"Fri, 02 Sep 2022 14:09:31 GMT"]>
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
		try {
		
		Cart response = restTemplate.exchange(
		    "http://localhost:8084/cart-service/cart/GetCartByUsername", HttpMethod.GET, requestEntity, Cart.class, new ArrayList()).getBody();
		
		Items[] items = restTemplate.exchange(
			    "http://localhost:8084/cart-service/cart/GetAllItemsByUsername", HttpMethod.GET, requestEntity, Items[].class, new ArrayList()).getBody();
		
		Address address=restTemplate.exchange(
			    "http://localhost:8084/profilejwt/GetAddressByUserName", HttpMethod.GET, requestEntity, Address.class, new ArrayList()).getBody();
		
		int customerId=response.getCatrId();
		double amount=response.getTotalPrice();
		String status="Placed";
		LocalDateTime localDateTime = LocalDateTime.now();
		
		Order order=new Order(1,localDateTime,customerId,amount,payMode,status);
		order.setOrderId(orSeqGenService.getOrderSequenceNumber(Order.SEQUENCE_NAME));
		orepo.save(order);
		List l=new ArrayList();
		l.add("ORDER DETAILS");
		l.add(order);
		l.add("DELIVERY ADDRESS DETAILS");
		l.add(address);
		l.add("ORDER ITEMS DETAILS");
		for(int i=0;i<items.length;i++)
		{
			int quantity=items[i].getQuantity();
			int id=items[i].getProductId();
			
			
			try {
				
				String r = restTemplate.exchange(
				    "http://localhost:8084/product-service/product/updateProductQuantity/"+id+"/"+quantity, HttpMethod.PUT, requestEntity, String.class, new ArrayList()).getBody().toString();
			
			}
			catch(Exception e)
			{
				System.out.println("Item Stock Quantity chnage unsuccessful");
			}
			
			
			
			l.add(items[i]);
		}
		return l ;
		
		}
		catch(Exception e)
		{ 
		
			List l=new ArrayList();
			l.add("AUTHORIZATION FAILED");
			return l;
		}
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


	public List getAllOrders() {
		List l=orepo.findAll();
		System.out.println(l);
		return l;
	}


	public Order orderStatusChange(int id, String status) {
		Optional<Order> op=orepo.findById(id);
		Order o=op.get();
		o.setOrderStatus(status);
		orepo.save(o);
		return o;
	}


	public List findById(int id) {
		Optional<Order> op=orepo.findById(id);
		if(op!=null)
		{
		Order o =op.get();
		List l=new ArrayList();
		l.add(o);
		return l;
		}
		else
		{
			List l=new ArrayList();
			l.add("NO ORDERS FOUND FOR GIVEN ID");
			return l;
		}
		
	}


	


	public int getCartId(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
		try {
		
		Cart response = restTemplate.exchange(
		    "http://localhost:8084/cart-service/cart/GetCartByUsername", HttpMethod.GET, requestEntity, Cart.class, new ArrayList()).getBody();
		int cartId=response.getCatrId();
		return cartId;
		}
		catch(Exception e)
		{ 
		return 0;
		}
		
	}


	


	
}
