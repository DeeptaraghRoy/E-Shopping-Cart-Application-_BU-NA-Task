package com.capg.order.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capg.order.entity.Order;
import com.capg.order.service.OrderService;
import com.capg.orderservice.rabbitmq.config.MessagingConfig;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;


@RestController
@RequestMapping("/Order/")
@SecurityRequirement(name = "ShoppingOrder")
public class OrderController {

	
	@Autowired
    private RabbitTemplate template;
	
	@Autowired
	private OrderService oservice;
	
	@PostMapping("PlaceOrder/{payMode}")
	public List PlaceOrder(@PathVariable("payMode") String payMode,@RequestHeader("Authorization") String token)
	{
		if(payMode.equalsIgnoreCase("CASH") || payMode.equalsIgnoreCase("PAYPAL") || payMode.equalsIgnoreCase("INTERNET BANKING") || payMode.equalsIgnoreCase("CREDIT CARD") || payMode.equalsIgnoreCase("DEBIT CARD")) {
			List l=oservice.placeOrder(token,payMode);
			template.convertAndSend(MessagingConfig.EXCHANGE, MessagingConfig.ROUTING_KEY, l.get(0));
			return l;
		}
		else {
			List l = new ArrayList();
			l.add("INVALID PAYMENT MODE");
			l.add("AVAILABLE PAYMENT MODES : ");
			l.add("CASH");
			l.add("PAYPAL");
			l.add("INTERNET BANKING");
			l.add("CREDIT CARD");
			l.add("DEBIT CARD");
			
			return l;
		}
		
	}
	
	@GetMapping("GetAllOrders")
	public List GetAllOrders(@RequestHeader("Authorization") String token)
	{
		boolean s=oservice.testAuthAdmiin(token);
		if(s==true)
		{
			List l=oservice.getAllOrders();
			return l;
		}
		else
		{
			List l=new ArrayList();
			l.add("AUTHORIZATION FAILED MUST BE AN ADMIN TO VIEW ALL ORDERS");
			return l;
		}
	}
	
	@PutMapping("ChangeOrderStatus/{id}/{status}")
	public List ChangeOrderStatus(@PathVariable("id") int id,@PathVariable("status") String status,@RequestHeader("Authorization") String token)
	{
		boolean s=oservice.testAuthAdmiin(token);
		if(s==true)
		{
		Order o=oservice.orderStatusChange(id,status);
		List l=new ArrayList();
		l.add(o);
		return l;
		}
		else
		{
			List l=new ArrayList();
			l.add("AUTHORIZATION FAILED MUST BE AN ADMIN TO CHANGE ORDER STATUS");
			return l;
		}
		
	}
	

	@GetMapping("GetOrderById/{id}")
	public List getOrderByID(@PathVariable("id") int id,@RequestHeader("Authorization") String token)
	{
		boolean s=oservice.testAuthAdmiin(token);
		if(s==true)
		{
			List l=oservice.findById(id);
			return l;
		}
		else
		{
			
			int customerId=oservice.getCartId(token);
			if(customerId==id)
			{
			List l=oservice.findById(customerId);
			return l;
			}
			else
			{
				List l=new ArrayList();
				l.add("MUST BE AN ADMIN TO VIEW THIS ORDER");
				return l;
			}
		}
	}
	
	@GetMapping("GetMyOrder")
	public List getMyOrder(@RequestHeader("Authorization") String token)
	{
		
			int customerId=oservice.getCartId(token);
			
			List l=oservice.findById(customerId);
			return l;
			
		
	}
	
	
	
	
	
	@DeleteMapping("DeleteOrderById/{id}")
	public String deleteOrderById(@PathVariable("id") int id,@RequestHeader("Authorization") String token)
	{
		int customerId=oservice.getCartId(token);
		if(customerId==id)
		{
			Order o=oservice.orderStatusChange(id,"Cancelled");
			return ("ORDER DELETED SUCCESSFULLY");
		}
		else
		{
			return("CANNOT DELETE THIS ORDER");
		}
		
	}
	
	
	
	
	
	
}
