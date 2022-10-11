package com.capg.profile.profileservice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.capg.profile.entity.Address;
import com.capg.profile.entity.Profile;
import com.capg.profile.profilerepositories.profileRepository;
import com.google.common.base.Optional;

@Service
public class UserService implements UserDetailsService {
	
	@Autowired
	private profileRepository prorepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		List<Profile> l=prorepo.findByUserName(username);
		if(username.indexOf('@')>-1) {
		String emailId=l.get(0).getEmailId();
		String password =l.get(0).getPassword();
		System.out.println("list  "+l);
		System.out.println("entered emailID "+username);
		System.out.println("fetched emailId "+emailId);
		System.out.println("fetched password "+password);
		
		return new User(emailId,password,new ArrayList<>());}
		else
		return new User("admin","password",new ArrayList<>());
		}

	/* public Profile addProfile(Profile profile) {
		return prorepo.save(profile);
	}*/
	
	public Profile addProfile(Profile profile) {
		if((prorepo.findByUserName(profile.getEmailId()).size())>0) {
			return null;
		}
		return prorepo.save(profile);
	}
	
	

	public List getAllProfiles(String userNam) {
		List<Profile> l=prorepo.findByUserName(userNam);
		if(userNam.indexOf('@')>-1) {
			String role=l.get(0).getRole();
			if(role.equalsIgnoreCase("admin"))
			{
				return prorepo.findAll();
			}
			else
			{	
			   List lf=new ArrayList();
			   lf.add( "MUST BE AN ADMIN TO VIEW ALL PROFILES");
			    return lf;
			}
			
		}
		return null;
	}

	public List<Profile> getProfileByID(String userNam ,int id) {
		List<Profile> l=prorepo.findByUserName(userNam);
		if(userNam.indexOf('@')>-1) {
			String role=l.get(0).getRole();
			int pid=l.get(0).getProfileId();
			if(role.equalsIgnoreCase("admin"))
			{
				java.util.Optional<Profile> op = prorepo.findById(id);
				if (op.isPresent()) {
					Profile prof = op.get();
					List lp=new ArrayList();
					lp.add(prof);
					return lp;
				}
			}
			else
			{	
			   if(id==pid)
			   {
				   java.util.Optional<Profile> op = prorepo.findById(id);
					if (op.isPresent()) {
						Profile prof = op.get();
						List lp=new ArrayList();
						lp.add(prof);
						return lp;
					}
				}
				else {
					List lf=new ArrayList();
					lf.add( "YOU MUST BE AN ADMIN TO VIEW SOMEONE ELSE'S PROFILE BY ID");
					return lf;
				}
			  }
			
		}
		return null;
	}
public List getProfileByUsername(String userNam, String name) {
		
		List<Profile> l=prorepo.findByUserName(userNam);
		if(userNam.indexOf('@')>-1) {
			String role=l.get(0).getRole();
			if(role.equalsIgnoreCase("admin"))
			{
				List la=prorepo.findByUserName(name);
				return la;
				
			}
			else
			{	
			   if(userNam.equals(name)){
				   List lu=prorepo.findByUserName(name);
					return lu;
			   }
			   else {
				   List lf=new ArrayList();
				   lf.add("YOU MUST BE AN ADMIN TO VIEW SOMEONE ELSE'S PROFIE BY USERNAME");
				   return lf;
			   }
			   
			   
			}
			
		}
		return null;
	}

	public List getProfileByMobileNumber(String userNam, long mobno) {
		List<Profile> l=prorepo.findByUserName(userNam);
		if(userNam.indexOf('@')>-1) {
			String role=l.get(0).getRole();
			long mobileno=l.get(0).getMobileNumber();
			if(role.equalsIgnoreCase("admin"))
			{
				List la=prorepo.findByMobileNumber(mobno);
				return la;
				
			}
			else
			{	
			   if(mobno==mobileno){
				   List lu=prorepo.findByMobileNumber(mobno);
					return lu;
			   }
			   else {
				   List lf=new ArrayList();
				   lf.add("YOU MUST BE AN ADMIN TO VIEW SOMEONE ELSE'S PROFIE BY MOBILE NUMBER");
				   return lf;
			   }
			   
			   
			}
			
		}
		return null;
	}
	
	public Profile viewProfile(String userNam) {
		List<Profile> l=prorepo.findByUserName(userNam);
		
			return l.get(0);
			
	}
	
	public String updateProfile(String userNam, Profile profile) {
		List<Profile> l=prorepo.findByUserName(userNam);
		if(userNam.indexOf('@')>-1) {
			
			String role=l.get(0).getRole();
			int id=l.get(0).getProfileId();
			String password=l.get(0).getPassword();
			
			String fullName=profile.getFullName();
			String emailId=profile.getEmailId();
			long mobileNumber=profile.getMobileNumber();
			String about=profile.getAbout();
			String age=profile.getAge();
		 	String gender=profile.getGender();
			
			Address address=profile.getAddress();
			
			Profile pro=new Profile(id,fullName,emailId,mobileNumber,about,age,gender,role,password,address);
			
			prorepo.save(pro);
			return "PROFILE UPDATED SUCCESSFULLY";
			
		}
		return "PROFILE UPDATE FAILED TRY AGAIN";
	}


	public String deleteProfile(String userNam) {
		List<Profile> l=prorepo.findByUserName(userNam);
		prorepo.delete(l.get(0));
		return "POFILE DELETED SUCCESSFULLY";
	}

	public String productVerifyAdmin(String userNam) {
		List<Profile> l=prorepo.findByUserName(userNam);
		if(userNam.indexOf('@')>-1) {
			String role=l.get(0).getRole();
			
			if(role.equalsIgnoreCase("admin"))
			{
				return "true";
			}
			else
			{
				return "false";
			}
		}
		else
			return null;
	}

	public Address getAddressByUSerName(String userNam) {
		List<Profile> l=prorepo.findByUserName(userNam);
		if(userNam.indexOf('@')>-1) {
			return l.get(0).getAddress();
		}
		else
			return null;
	}
}


