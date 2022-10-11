package VO;

import com.capg.cartserviceentity.Items;

public class ResponseTemplateVO {
	
	private Product product;
	private Items item;
	public ResponseTemplateVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ResponseTemplateVO(Product product, Items item) {
		super();
		this.product = product;
		this.item = item;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Items getItem() {
		return item;
	}
	public void setItem(Items item) {
		this.item = item;
	}
	@Override
	public String toString() {
		return "ResponseTemplateVO [product=" + product + ", item=" + item + "]";
	}
	

}
