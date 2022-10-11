package com.capg.productservicecontroller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.capg.productservice.entity.Product;
import com.capg.productservice.repositories.ProductRepository;
import com.capg.productserviceservice.ProductService;
import com.capg.productserviceservice.SequenceGeneratorService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/product/")
@SecurityRequirement(name = "ShoppingProduct")
public class ProductServiceImpl {

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ProductService pservice;
	
	@Autowired
	private SequenceGeneratorService seqservice;

	@PostMapping("addproducts")
	public ResponseEntity<Product> addProducts(@RequestBody Product product,@RequestHeader("Authorization") String token) {
		
		boolean b= pservice.testAuthAdmiin(token);
		
		if(b==true)
		{
		product.setProductId(seqservice.getSequenceNumber(Product.SEQUENCE_NAME));
		Product prod = pservice.addProducts(product);
		return new ResponseEntity<Product>(prod, HttpStatus.CREATED);
		}
		else
		{
			return new ResponseEntity("AUTHORIZATION FAILED", HttpStatus.FORBIDDEN);
		}

	}
	
	@DeleteMapping("deleteproduct/{id}")
	public ResponseEntity<String> deleteProductById(@PathVariable("id") int id,@RequestHeader("Authorization") String token) {
		
		boolean b= pservice.testAuthAdmiin(token);
		
		if(b==true)
		{
		pservice.deleteById(id);
		return new ResponseEntity<String>("DELETE SUCCESFULLY", HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity("AUTHORIZATION FAILED", HttpStatus.FORBIDDEN);
		}
		
		
	}
	
	@GetMapping("allproducts")
	public List<Product> getAllProducts() {
		List<Product> list = new ArrayList<>();
		((ArrayList<Product>) pservice.getAll()).forEach(list::add);
		return list;

	}
	
	@GetMapping("getProductById/{id}")
	public ResponseEntity<Object> getProductById(@PathVariable("id") int id) {
		
		
		Optional<Product> op = pservice.findById(id);
		if (op.isPresent()) {
			Product product = op.get();
			return new ResponseEntity<Object>(product, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("Problem in Fetching Data", HttpStatus.NOT_FOUND);
		
		
	}
	
	@GetMapping("getProductByName/{name}")
	public List<Product> getProductByName(@PathVariable("name") String name) {
		
		
		List<Product> op = pservice.findByName(name);
		if (!op.isEmpty()) {
			return op;
		}
		return null;
		
		
	}
	
	@GetMapping("getProductByCategory/{cat}")
	public List<Product> getProductByCategory(@PathVariable("cat") String cat) {
		
		
		List<Product> op = pservice.findByCategory(cat);
		if (!op.isEmpty()) {
			return op;
		}
		return null;
		
		
	}
	
	@PutMapping("updateProduct/{id}")
	public ResponseEntity<Object> UpdateListingById(@PathVariable("id") int id, @RequestBody Product product,@RequestHeader("Authorization") String token) {
		
		boolean b= pservice.testAuthAdmiin(token);
		
		if(b==true)
		{
		Optional<Product> op = pservice.findById(id);
		if (op.isPresent()) {
			Product ord = op.get();
			
			ord.setProductName(product.getProductName());
			ord.setCategory(product.getCategory());
			ord.setPrice(product.getPrice());
			ord.setDescription(product.getDescription());
			ord.setStockQuantity(product.getStockQuantity());
			ord.setProductImg(product.getProductImg());
			
			pservice.addProducts(ord);
			return new ResponseEntity<Object>(ord, HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>("Not updated successfully", HttpStatus.NOT_FOUND);
		}
		}
		else
		{
			return new ResponseEntity("AUTHORIZATION FAILED", HttpStatus.FORBIDDEN);
		}

	}
	
	@PutMapping("updateProductQuantity/{id}/{quantity}")
	public String UpdateListingByIdQuantity(@PathVariable("id") int id,@PathVariable("quantity") int quantity) {
		
		
		Optional<Product> op = pservice.findById(id);
		
			Product ord = op.get();
			ord.setStockQuantity(ord.getStockQuantity()-quantity);
			
			pservice.addProducts(ord);
			return "STOCK QUANTITY UPDATED";
		
	}
	
}
