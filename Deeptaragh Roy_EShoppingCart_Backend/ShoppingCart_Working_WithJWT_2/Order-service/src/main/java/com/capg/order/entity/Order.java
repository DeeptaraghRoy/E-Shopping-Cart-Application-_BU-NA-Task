package com.capg.order.entity;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Document(collection="order")
public class Order {
	
	@Transient
    public static final String SEQUENCE_NAME = "order_sequence";
	@Id
	private int orderId;
	
	@Field
	private LocalDateTime orderDate;
	
	@Field
	private Integer customerId;
	
	@Field
	private double amountPaid;
	
	@Field
	private String modeOfPayment;
	
	@Field
	private String orderStatus;
	
	

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Order(int orderId, LocalDateTime orderDate, Integer customerId, double amountPaid, String modeOfPayment,
			String orderStatus) {
		super();
		this.orderId = orderId;
		this.orderDate = orderDate;
		this.customerId = customerId;
		this.amountPaid = amountPaid;
		this.modeOfPayment = modeOfPayment;
		this.orderStatus = orderStatus;
	}



	public int getOrderId() {
		return orderId;
	}



	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}



	public LocalDateTime getOrderDate() {
		return orderDate;
	}



	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}



	public Integer getCustomerId() {
		return customerId;
	}



	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}



	public double getAmountPaid() {
		return amountPaid;
	}



	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}



	public String getModeOfPayment() {
		return modeOfPayment;
	}



	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}



	public String getOrderStatus() {
		return orderStatus;
	}



	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}



	public static String getSequenceName() {
		return SEQUENCE_NAME;
	}



	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", orderDate=" + orderDate + ", customerId=" + customerId + ", amountPaid="
				+ amountPaid + ", modeOfPayment=" + modeOfPayment + ", orderStatus=" + orderStatus + "]";
	}

	
	
}
