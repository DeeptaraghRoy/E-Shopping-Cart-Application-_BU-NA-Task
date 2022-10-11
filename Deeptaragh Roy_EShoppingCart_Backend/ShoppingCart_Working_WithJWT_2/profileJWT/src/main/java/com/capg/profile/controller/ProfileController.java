package com.capg.profile.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthenticatedAuthorizationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.capg.profile.entity.Address;
import com.capg.profile.entity.JwtRequest;
import com.capg.profile.entity.JwtResponse;
import com.capg.profile.entity.Profile;
import com.capg.profile.jwt.utility.JwtUtility;
import com.capg.profile.profileservice.ProfileSequenceGeneratorService;
import com.capg.profile.profileservice.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@SecurityRequirement(name = "ShoppingProfile")
public class ProfileController {

	@Autowired
	private JwtUtility jwtUtility;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private ProfileSequenceGeneratorService prSeqGenService;
	
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	
	private String t;
//--------------------------JWT REQUIRED AUTHENTICATION------------------------------------	
	@GetMapping("/")
	public String test()
	{
		return "Hello Security test";
	}
	
	@PostMapping("/authenticate")
	public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest)throws Exception
	{
		try {
			//GENERATION FIRST 2 PART TOKEN
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails
                = userservice.loadUserByUsername(jwtRequest.getUsername());
        //SIGNING
        final String token =
                jwtUtility.generateToken(userDetails);

        return  new JwtResponse(token);
	}
//---------------------------------------------------------------------------------------------
//---------------------------WITHOUT AUTHENTICATION CREATE NEW USER--------------------------------------------
	@PostMapping("/Signup")
	public ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {

		profile.setProfileId(prSeqGenService.getProfileSequenceNumber(Profile.SEQUENCE_NAME));
		profile.setPassword(bCryptPasswordEncoder.encode(profile.getPassword()));
		
		Profile pro = userservice.addProfile(profile);
		if(pro == null) {
			return new ResponseEntity<Profile>(pro, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<Profile>(pro, HttpStatus.CREATED);

	}
//--------------------------WITH AUTHENTICATION-------------------------------------------------
//--------------------------GET ALL PROFILES ONLY ADMIN AUTHORIZATION---------------------------
	
	@GetMapping("/GetAllProfiles")
	public List getAllProfiles()
	{
		
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        List l=userservice.getAllProfiles(userNam);
		return l;
	}
//--------------------GET PROFILE BY ID ONLY ADMIN AUTHORIZATION OR ID IS OF THE LOGGED IN USER------------------------ 	
	@GetMapping("/GetProfileById/{id}")
	public List getProfileById(@PathVariable("id")int id)
	{
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        List l=userservice.getProfileByID(userNam,id);
        return l;
        
	}
	
	//--------------------GET PROFILE BY USERNAME ONLY ADMIN AUTHORIZATION OR USERNAME IS OF THE LOGGED IN USER------------------------	
	@GetMapping("/GetProfileByUserName/{name}")
	public List getProfileByUserName(@PathVariable("name")String name)
	{
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        List l=userservice.getProfileByUsername(userNam,name);
        return l;
        
	}
	
	//--------------------GET PROFILE BY MOBILENUMBER ONLY ADMIN AUTHORIZATION OR MOBILENUMBER IS OF THE LOGGED IN USER------------------------	
		@GetMapping("/GetProfileByMobileNumber/{mobno}")
		public List getProfileByMobileNumber(@PathVariable("mobno")long mobno)
		{
			String authorization = request.getHeader("Authorization");
	        String t = null;
	        String userName = null;

	        if(null != authorization && authorization.startsWith("Bearer ")) {
	            t = authorization.substring(7);
	            
	        }
	        String userNam=jwtUtility.getUsernameFromToken(t);
	        List l=userservice.getProfileByMobileNumber(userNam,mobno);
	        return l;
	        
		}
	
	//---------------VIEW CURRENT LOGGED IN PROFILE BOTH ADMIN AND USER AUTHORIZATION---------------------------
	@GetMapping("/ViewProfile")
	public Profile viewProfile()
	{
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        Profile pf=userservice.viewProfile(userNam);
        return pf;
        
	}
	
	
	//---------------UPDATE CURRENT LOGGED IN PROFILE BOTH ADMIN AND USER AUTHORIZATION---------------------------
	@PutMapping("/UpdateProfile")
	public String updateProfile(@RequestBody Profile profile)
	{
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        profile.setProfileId(prSeqGenService.getProfileSequenceNumber(Profile.SEQUENCE_NAME));
		profile.setPassword(bCryptPasswordEncoder.encode(profile.getPassword()));
        String s=userservice.updateProfile(userNam,profile);
        return s;
        		
	}
	//-----------------DELETE CURRENT PROFILe--------------------------------------------
	@DeleteMapping("/DeleteProfile")
	public String deleteProfile()
	{
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        String s=userservice.deleteProfile(userNam);
        return s;
	}
	//--------------------------PRODUCT VERIFY ADMIN------------------------------------------
	@GetMapping("/VerifyAdmin")
	public String verifyAdmin()
	{
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        String s=userservice.productVerifyAdmin(userNam);
        //System.out.println(" pcpcpcpcpccppccpcpcp"+s);
        return s;
	}
	//-----------------------------GET ADDRESS BY USER NAME--------------------------------------------
	@GetMapping("GetAddressByUserName")
	public Object getAddressByUserName()
	{
		String authorization = request.getHeader("Authorization");
        String t = null;
        String userName = null;

        if(null != authorization && authorization.startsWith("Bearer ")) {
            t = authorization.substring(7);
            
        }
        String userNam=jwtUtility.getUsernameFromToken(t);
        Address a= userservice.getAddressByUSerName(userNam);
        return a;
	}
}
