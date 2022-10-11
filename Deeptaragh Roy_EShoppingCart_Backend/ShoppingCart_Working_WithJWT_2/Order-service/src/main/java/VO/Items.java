package VO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;




public class Items {
	
	private int productId;
	
	private String productName;
	
	private double price;
	
	private int quantity;
	
	private String category;
	
	
	private String username;

	public Items() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Items(int productId, String productName, double price, int quantity, String category, String username) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.quantity = quantity;
		this.category = category;
		this.username = username;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "Items [productId=" + productId + ", productName=" + productName + ", price=" + price + ", quantity="
				+ quantity + ", category=" + category + ", username=" + username + "]";
	}
	

	

}
