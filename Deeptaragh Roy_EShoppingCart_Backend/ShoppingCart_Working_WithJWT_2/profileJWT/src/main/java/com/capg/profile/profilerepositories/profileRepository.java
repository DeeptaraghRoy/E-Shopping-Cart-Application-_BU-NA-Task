package com.capg.profile.profilerepositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.capg.profile.entity.Profile;

@Repository
public interface profileRepository extends MongoRepository<Profile, Integer> {

	@Query("{'emailId' : :#{#emailId}}")
	public List<Profile> findByUserName(String emailId);
	
	@Query("{'mobileNumber' : :#{#mobno}}")
	public List<Profile> findByMobileNumber(long mobno);
	
	
    

}
