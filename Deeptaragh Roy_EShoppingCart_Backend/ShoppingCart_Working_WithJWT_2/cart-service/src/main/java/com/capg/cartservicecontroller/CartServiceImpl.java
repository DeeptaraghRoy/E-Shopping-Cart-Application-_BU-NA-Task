package com.capg.cartservicecontroller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.capg.cartserviceentity.Cart;
import com.capg.cartserviceentity.Items;
import com.capg.cartservicerepositories.ItemRepository;
import com.capg.cartserviceservice.CartSequenceGeneratorService;
import com.capg.cartserviceservice.CartService;


import VO.Product;
import VO.ResponseTemplateVO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/cart/")
@SecurityRequirement(name = "ShoppingCart")
public class CartServiceImpl {
	
	@Autowired
	private CartService cservice;
	
	@Autowired
	private CartSequenceGeneratorService cseqservice;
	
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private RestTemplate restTemplate;
	
//----------DISPLAY ALL ITEMS----------------
	@GetMapping("available-items")
	public List getProductwithCart() {
		List l= cservice.getProductwithCart();
		//System.err.println(l.get(0));
		return l;
	}
//------------ADD ITEMS BY NAME----------------
	@PostMapping("items/{name}/{qty}")
	public List getProductwithCartByName(@PathVariable("name") String name,@PathVariable("qty") int qty,@RequestHeader("Authorization") String token) {
		
		
		//Product [productId=6, productName=TV, category=electronics, price=500000.0, description=new]
		
		/*200,{"profileId":3,"fullName":"Arnab Nag","emailId":"arnabnag2000@gmail.com","mobileNumber":9007874175,"about":"hello test about update","age":"23","gender":"male","role":"user","password":"1234567890"},[transfer-encoding:"chunked", X-Content-Type-Options:"nosniff", X-XSS-Protection:"1; mode=block", Cache-Control:"no-cache, no-store, max-age=0, must-revalidate", Pragma:"no-cache", Expires:"0", X-Frame-Options:"DENY", Content-Type:"application/json", Date:"Sun, 28 Aug 2022 05:26:16 GMT"]>
{"profileId":3,"fullName":"Arnab Nag","emailId":"arnabnag2000@gmail.com","mobileNumber":9007874175,"about":"hello test about update","age":"23","gender":"male","role":"user","password":"1234567890"}
*/
			Object o= cservice.testAuthViewProfile(token);
			List l1=new ArrayList();	
		if(o!=null) {
		String os=o.toString();
		String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
		List<Product> l= cservice.getProductwithCartByName(name);
		for(int i=0;i<l.size();i++)
		{
			
			
			String naa=l.get(i).getProductName();
			int idd=l.get(i).getProductId();
			double pr=l.get(i).getPrice();
			String cat=l.get(i).getCategory();
			String img=l.get(i).getProductImg();
			
			System.out.println(idd);
			System.out.println(naa);
			System.out.println(pr);
			System.out.println(qty);
			System.out.println(cat);
			Items item=new Items(idd,naa,pr,qty,cat,usName,img);
			l1.add(item);
			cservice.save(item);
			
		}
		
		
		
		
		return l1;
		}
		else
		{
			List l=new ArrayList();
			l.add("AUTHORIZATION FAILED");
			return l;
		}
		
			
	}

//-------------ADD ITEMS TO CART-----------------------------------	
	@PostMapping("addcart")
	public ResponseEntity<Cart> addcart(@RequestHeader("Authorization") String token) {

		Object o= cservice.testAuthViewProfile(token);
		
		if(o!=null) {
		String os=o.toString();
		String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
			List<Items> list = cservice.getItemsByUserName(usName);
			double totalPrice=0.0;
			for(int i=0;i<list.size();i++)
			{
				totalPrice=totalPrice+(list.get(i).getPrice()*list.get(i).getQuantity());
			}
			Cart cart=new Cart((cseqservice.getCartSequenceNumber(Cart.SEQUENCE_NAME)),totalPrice,usName);
			Cart c = cservice.saveC(cart);
			return new ResponseEntity<Cart>(c, HttpStatus.CREATED);
			}
			else
				return new ResponseEntity("AUTHORIZATION FAILED", HttpStatus.FORBIDDEN);
			
	}
	
//-------------UPDATE ITEMS TO CART-----------------------------------	
	@PutMapping("updatecart")
	public ResponseEntity<Cart> updatecart(@RequestHeader("Authorization") String token) {

Object o= cservice.testAuthViewProfile(token);
		
		if(o!=null) {
		String os=o.toString();
		String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
			List<Items> list = cservice.getItemsByUserName(usName);
			
			double totalPrice=0.0;
			for(int i=0;i<list.size();i++)
			{
				totalPrice=totalPrice+(list.get(i).getPrice()*list.get(i).getQuantity());
			}
			
			List<Cart> l1=cservice.getCartByUserName(usName);
			
					
			int id=l1.get(0).getCatrId();
			Cart cart=new Cart(id,totalPrice,usName);
			Cart c = cservice.saveC(cart);
			return new ResponseEntity<Cart>(c, HttpStatus.CREATED);
			}
			else
				return new ResponseEntity("AUTHORIZATION FAILED", HttpStatus.FORBIDDEN);
			
			
	}
//------------UPDATE CART ADD ITEMS BY NAME----------------------------------	
		@PostMapping("updateCart/addItem/{name}/{qty}")
		public List updateGetProductwithCartByName(@PathVariable("name") String name,@PathVariable("qty") int qty,@RequestHeader("Authorization") String token) {
			
			
		//Product [productId=6, productName=TV, category=electronics, price=500000.0, description=new]
		
		/*200,{"profileId":3,"fullName":"Arnab Nag","emailId":"arnabnag2000@gmail.com","mobileNumber":9007874175,"about":"hello test about update","age":"23","gender":"male","role":"user","password":"1234567890"},[transfer-encoding:"chunked", X-Content-Type-Options:"nosniff", X-XSS-Protection:"1; mode=block", Cache-Control:"no-cache, no-store, max-age=0, must-revalidate", Pragma:"no-cache", Expires:"0", X-Frame-Options:"DENY", Content-Type:"application/json", Date:"Sun, 28 Aug 2022 05:26:16 GMT"]>
{"profileId":3,"fullName":"Arnab Nag","emailId":"arnabnag2000@gmail.com","mobileNumber":9007874175,"about":"hello test about update","age":"23","gender":"male","role":"user","password":"1234567890"}
*/
			Object o= cservice.testAuthViewProfile(token);
			
		if(o!=null) {
		String os=o.toString();
		String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
		List<Product> l= cservice.getProductwithCartByName(name);
		for(int i=0;i<l.size();i++)
		{
			
			
			String naa=l.get(i).getProductName();
			int idd=l.get(i).getProductId();
			double pr=l.get(i).getPrice();
			String cat=l.get(i).getCategory();
			String img=l.get(i).getProductImg();
			
			System.out.println(idd);
			System.out.println(naa);
			System.out.println(pr);
			System.out.println(qty);
			System.out.println(cat);
			Items item=new Items(idd,naa,pr,qty,cat,usName,img);
			cservice.save(item);
			
		}
		
		
		
		return l;
		}
		else
		{
			List l=new ArrayList();
			l.add("AUTHORIZATION FAILED");
			return l;
		}
		
			
		}
//--------------------CHANGE ITEM QUANTITY----------------------------------
		
				@PutMapping("updateCart/itemQuantity/{name}/{qty}")
				public List<Items> changeQuantity(@PathVariable("name") String name,@PathVariable("qty") int qty,@RequestHeader("Authorization") String token)
				{
					Object o= cservice.testAuthViewProfile(token);
					
					if(o!=null) {
					String os=o.toString();
					String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
					List<Items> l=cservice.getItem(name,usName);
					//Items [productId=0, productName=laptop, price=50000.22, quantity=1, category=electronics]
					List l1=new ArrayList();
					for(int i=0;i<l.size();i++)
					{
						
						String naa = l.get(i).getProductName();
						int idd = l.get(i).getProductId();
						double pr = l.get(i).getPrice();
						String cat = l.get(i).getCategory();
						int quantity = l.get(i).getQuantity();
						String img=l.get(i).getProductImg();
						
						System.out.println(idd);
						System.out.println(naa);
						System.out.println(pr);
						System.out.println(qty);
						System.out.println(cat);
						
						Items item=new Items(idd,naa,pr,quantity,cat,usName,img);
						cservice.delete(item);
						Items item1=new Items(idd,naa,pr,qty,cat,usName,img);
						l1.add(item1);
						cservice.save(item1);
						
						
					}
					return l1;
					}
					else {
						List l=new ArrayList();
						l.add("AUTHORIZATION FAILED");
						return l;
					}
					
					
					
				}
						
//--------------------UPDATE CART DELETE  ITEMS BY NAME-----------------------
		@DeleteMapping("updateCart/deleteItem/{name}")
		public List updateDelProductwithCartByName(@PathVariable("name") String name,@RequestHeader("Authorization") String token) {
			
			Object o= cservice.testAuthViewProfile(token);
			List l1=new ArrayList();	
		if(o!=null) {
		String os=o.toString();
		String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
		List<Product> l= cservice.getProductwithCartByName(name);
		for(int i=0;i<l.size();i++)
		{
			
			int qty=0;
			String naa=l.get(i).getProductName();
			int idd=l.get(i).getProductId();
			double pr=l.get(i).getPrice();
			String cat=l.get(i).getCategory();
			String img=l.get(i).getProductImg();
			
			System.out.println(idd);
			System.out.println(naa);
			System.out.println(pr);
			System.out.println(qty);
			System.out.println(cat);
			Items item=new Items(idd,naa,pr,qty,cat,usName,img);
			l1.add(item);
			cservice.delete(item);
			
		}
		
		
		
		return l1;
		}
		else
		{
			List l=new ArrayList();
			l.add("AUTHORIZATION FAILED");
			return l;
		}
	}
	//----------------------------GET CART BY USERNAME----------------------------------
		@GetMapping("GetCartByUsername")
		public Object getCartByUserName(@RequestHeader("Authorization") String token)
		{
			Object o= cservice.testAuthViewProfile(token);
			if(o!=null)
			{
				String os=o.toString();
				String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
				List<Cart> l= cservice.getCartByUserName(usName);
				return l.get(0);
			}
			else
			{
				List l=new ArrayList();
				l.add("AUTHORIZATION FAILED");
				return l.get(0);
			}
		}
	//------------------------------GET ALL ITEMS IN CART BY USERNAME------------------
		@GetMapping("GetAllItemsByUsername")
		public ArrayList getAllItemsByUsername(@RequestHeader("Authorization") String token)
		{
			Object o= cservice.testAuthViewProfile(token);
			
			if(o!=null) {
			String os=o.toString();
			String usName=os.substring(os.indexOf("emailId")+10,os.indexOf("mobileNumber")-3 );
			List<Items> list = cservice.getItemsByUserName(usName);
			ArrayList ar=new ArrayList(list);
			return ar;}
			else
			{
				ArrayList l=new ArrayList();
				l.add("AUTHORIZATION FAILED");
				return l;
			}
			
		}
}
