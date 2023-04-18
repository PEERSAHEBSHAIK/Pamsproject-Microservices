package com.revature.pms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.revature.pms.entity.PhysicianAvailability;
import com.revature.pms.service.PhysicianAvailabiltiyService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "*")
public class AvailabilityController {
	@Autowired
	private PhysicianAvailabiltiyService service;
	
	@GetMapping("/physician")
	public ResponseEntity<List<PhysicianAvailability>> getPhysiciansService() {
			try {
				return new ResponseEntity<List<PhysicianAvailability>>(service.addPhysician(service.getPhysicianFromAuth()),HttpStatus.OK);
			} catch (UnirestException e) {
				// TODO Auto-generated catch block
				return new ResponseEntity<List<PhysicianAvailability>>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}
	@GetMapping("/physician-available")
	public ResponseEntity<List<PhysicianAvailability>> getAvailablePhysiciansService(@RequestParam boolean available) {
		List<PhysicianAvailability> availabilities = service.getAvailablePhysicians(available);
		if (availabilities == null)
			return new ResponseEntity<List<PhysicianAvailability>>(HttpStatus.INTERNAL_SERVER_ERROR);
		else if (availabilities.isEmpty())
			return new ResponseEntity<List<PhysicianAvailability>>(HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity<List<PhysicianAvailability>>(availabilities, HttpStatus.OK);
	}

//	@PostMapping("/add-availability")
//	public ResponseEntity<PhysicianAvailability> addPhysicianAvailabilityService(
//			@RequestBody PhysicianAvailability availability) {
//		PhysicianAvailability available = service.addPhysicianAvailability(availability);
//		if (available == null)
//			return new ResponseEntity<PhysicianAvailability>(HttpStatus.INTERNAL_SERVER_ERROR);
//		return new ResponseEntity<PhysicianAvailability>(available, HttpStatus.CREATED);
//	}

	@GetMapping("/count")
	public long countPhysicianAvailability() {
		return service.count();
	}
		
	@PutMapping("/update-availability")
	@Transactional
	public ResponseEntity<PhysicianAvailability>  updatePhysicianAvailabilityService(@RequestBody PhysicianAvailability availability) {
		service.schedulePhysician(availability.getStartDate(),availability.getEndDate(),availability.getEmail());
		return new ResponseEntity<PhysicianAvailability>(HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/update-status")
	public ResponseEntity<PhysicianAvailability> update(@RequestBody PhysicianAvailability availability){
		PhysicianAvailability avail = service.update(availability);
		return new ResponseEntity<PhysicianAvailability>(avail,HttpStatus.OK) ;
	}	
	@DeleteMapping("/physician-available/{email}")
	@Transactional
	public ResponseEntity<String> getPhysicianAvailabilitServiceyById(@PathVariable String email) {
		String status = service.deletePhysicianAvailabilityById(email);
		if (Integer.parseInt(status) == 0)	
			return new ResponseEntity<String>(status, HttpStatus.NOT_ACCEPTABLE);
		else
			return new ResponseEntity<String>(status, HttpStatus.ACCEPTED);
	}
}
