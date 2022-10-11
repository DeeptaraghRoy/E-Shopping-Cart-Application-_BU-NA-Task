package com.capg.cartservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.capg.cartserviceentity.Cart;
import com.capg.cartserviceentity.Items;
import com.capg.cartservicerepositories.CartRepository;
import com.capg.cartservicerepositories.ItemRepository;
import com.capg.cartserviceservice.CartService;




@SpringBootTest
class CartServiceApplicationTests {

	/*
	@Test
	void contextLoads() {
	}
	*/
	
	@Mock
	ItemRepository crepo;
	
	@Mock
	CartRepository cartrepo;
	
	@InjectMocks
	CartService cservice;
	
	public List<Items> myitems;
	public List<Cart> mycart = new ArrayList<Cart>();
	
	@Test
	public void test_save() {
		
		Items item = new Items(1, "ASUS Vivobook M1603QA-MB502WS", 54990, 9, "consumer electronics", "nilroy@gmail.com", "test.jpg");
		when(crepo.save(item)).thenReturn(item);
		assertEquals("ASUS Vivobook M1603QA-MB502WS",item.getProductName());
	}
	
	@Test
	public void test_getItemsByUserName() {
		
		List<Items> myitems = new ArrayList<Items>();
		myitems.add(new Items(1, "ASUS Vivobook M1603QA-MB502WS", 54990, 9, "consumer electronics", "nilroy@gmail.com", "test.jpg"));
		when(crepo.findItemsByUSerName("nilroy@gmail.com")).thenReturn(myitems);
		assertEquals(1,cservice.getItemsByUserName("nilroy@gmail.com").size());
	}
	
	@Test
	public void test_saveC() {
		
		Cart cart = new Cart(1, 6510101, "nilroy@gmail.com");
		when(cartrepo.save(cart)).thenReturn(cart);
		assertEquals("nilroy@gmail.com",cart.getUsername());
	}
	
	@Test
	public void test_getItem() {
		
		List<Items> myitems = new ArrayList<Items>();
		myitems.add(new Items(1, "ASUS Vivobook M1603QA-MB502WS", 54990, 9, "consumer electronics", "nilroy@gmail.com", "test.jpg"));
		when(crepo.findByName("ASUS Vivobook M1603QA-MB502WS","nilroy@gmail.com")).thenReturn(myitems);
		assertEquals(1,cservice.getItem("ASUS Vivobook M1603QA-MB502WS","nilroy@gmail.com").size());
	}
	
	
	@Test
	public void test_getCartByUserName() {
		
		List<Cart> mycart = new ArrayList<Cart>();
		mycart.add(new Cart(1, 6510101, "nilroy@gmail.com"));
		when(cartrepo.getCartByUserName("nilroy@gmail.com")).thenReturn(mycart);
		assertEquals(1,cservice.getCartByUserName("nilroy@gmail.com").size());
	}

}