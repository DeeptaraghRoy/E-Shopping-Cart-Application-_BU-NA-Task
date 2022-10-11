package com.capg.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;




@Document(collection = "profile_sequence")
public class ProfileSequence {
    
	@Id
    private String  id;
    private int seq;
	public ProfileSequence() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ProfileSequence(String id, int seq) {
		super();
		this.id = id;
		this.seq = seq;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	@Override
	public String toString() {
		return "ProfileSequence [id=" + id + ", seq=" + seq + "]";
	}
	
    
    
	
	
}