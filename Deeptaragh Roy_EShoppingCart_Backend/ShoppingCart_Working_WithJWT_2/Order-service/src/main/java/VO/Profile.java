package VO;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


public class Profile {
	

	private int profileId;
	
	private String fullName;
	
	private String emailId;
	
	private long mobileNumber;
	
	private String about;
	
	private String age;
	
	private String gender;
	
	private String role;
	
	private String password;
	
	private Address address;
	public Profile() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Profile(int profileId, String fullName, String emailId, long mobileNumber, String about, String age,
			String gender, String role, String password, Address address) {
		super();
		this.profileId = profileId;
		this.fullName = fullName;
		this.emailId = emailId;
		this.mobileNumber = mobileNumber;
		this.about = about;
		this.age = age;
		this.gender = gender;
		this.role = role;
		this.password = password;
		this.address = address;
	}
	public int getProfileId() {
		return profileId;
	}
	public void setProfileId(int profileId) {
		this.profileId = profileId;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public long getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	
	@Override
	public String toString() {
		return "Profile [profileId=" + profileId + ", fullName=" + fullName + ", emailId=" + emailId + ", mobileNumber="
				+ mobileNumber + ", about=" + about + ", age=" + age + ", gender=" + gender + ", role=" + role
				+ ", password=" + password + ", address=" + address + "]";
	}
	

}
