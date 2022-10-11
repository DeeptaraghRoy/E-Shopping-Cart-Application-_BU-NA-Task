package com.capg.productservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.capg.productservice.entity.Product;
import com.capg.productservice.repositories.ProductRepository;
import com.capg.productserviceservice.ProductService;

@SpringBootTest(classes = {ProductServiceApplicationTests.class})
class ProductServiceApplicationTests {

	/*
	@Test
	void contextLoads() {
	}
	*/
	
	@Mock
	ProductRepository prepo;
	
	@InjectMocks
	ProductService pservice;
	
	public List<Product> myproducts;
			
		@Test
		public void test_addProducts() {	
			
			
			Product prod = new Product(8,"shoes", "footwear", 5000.00, "new",100,"testimg");
			when(prepo.save(prod)).thenReturn(prod);
			System.out.println(prod);
			assertEquals("shoes",prod.getProductName());
		}
		
		@Test
		public void test_getAll() {	
			
			List<Product> myproducts = new ArrayList<Product>();
			myproducts.add(new Product(8,"shoes", "footwear", 5000.00, "new",100,"testimg"));
			when(prepo.findAll()).thenReturn(myproducts);
			assertEquals(1,((List<Product>) pservice.getAll()).size());
		}
		
				
		@Test
		public void test_findById() {	
			
			int prodId = 8;
			Product prod = new Product(8,"shoes", "footwear", 5000.00, "new",100,"testimg");
			when(prepo.findById(prodId)).thenReturn(Optional.of(prod));
			assertEquals(prodId,prod.getProductId());
		}
		
		@Test
		public void test_findByName() {	
			
			String prodName = "shoes";
			List<Product> myproducts = new ArrayList<Product>();
			myproducts.add(new Product(8,"shoes", "footwear", 5000.00, "new",100,"testimg"));
			when(prepo.findByName(prodName)).thenReturn(myproducts);
			assertEquals(prodName,myproducts.get(0).getProductName());
		}
		
		@Test
		public void test_findByCategory() {	
			
			String catName = "footwear";
			List<Product> myproducts = new ArrayList<Product>();
			myproducts.add(new Product(8,"shoes", "footwear", 5000.00, "new",100,"testimg"));
			when(prepo.findByCategory(catName)).thenReturn(myproducts);
			assertEquals(catName,myproducts.get(0).getCategory());
		}
		
		
}
