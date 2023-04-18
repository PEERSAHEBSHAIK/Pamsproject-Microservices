package com.revature.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.dao.AppointmentInterface;
import com.revature.dto.AppoinmentDto;
import com.revature.model.Appointment;
import com.revature.service.AppointmentService;

import jakarta.transaction.Transactional;


@RestController
@CrossOrigin(origins = "*")
public class PhysicianController {
	
	Appointment appoint = new Appointment();
	AppoinmentDto appointmetdto=new AppoinmentDto();
	
	@Autowired
	AppointmentService appointmentservice;
	
	@Autowired
	private AppointmentInterface appoinmentinterface;
	
	
	@GetMapping("/appointment/{id}/{status}")
	public List<Appointment> patientAppointments(@PathVariable Integer id,@PathVariable String status){
		return appointmentservice.getPatientsAppointments(id,status);
	}
	
	@GetMapping("appointment/{id}")
	public Appointment getAppointments(@PathVariable int id){
		return appointmentservice.getAppointmentsService(id);
		}
	
	@PutMapping("/appointment/{id}/{status}")
	@Transactional		
	public void updateStatusById(@PathVariable Integer id,@PathVariable String status) {
		System.out.println(id+" "+status);
		appointmentservice.updateById(id, status);
	}
	@PostMapping("/appointment")
	public Appointment appointments(@RequestBody Appointment appointments){
		return appointmentservice.getAppointment(appointments);
	}
	
	@GetMapping("/appointments/{physcianEmail}/{date}/{acceptance}")
	public List<Appointment> patientsByStatus(@PathVariable String physcianEmail,@PathVariable String date,@PathVariable String acceptance){
		return appointmentservice.getAppointments(physcianEmail,date,acceptance);		
	}
	
	@PostMapping("test")
	public List<Appointment> getAppointment(@RequestBody List<Appointment> appointments){
		return appointmentservice.store(appointments);	
	}
	
	@GetMapping("/appointments/{status}")
	public List<Appointment> patientsByStatus(@PathVariable String status){
	
		return appointmentservice.getAppointments(status);		
	}
	@PutMapping("/appointment")
	public Appointment updateAppointment(@RequestBody Appointment appointment) {
		return appointmentservice.updateStatus(appointment);
	}
	
//	@PutMapping("/appointmentbyid/{id}")
//	public Appointment updatebyid(@PathVariable int id,@RequestBody Appointment appointment){
//	
//		
////		Appointment upadtebyid=appoinmentinterface.findById(id).get();
////		upadtebyid.setAcceptance(appointment.getAcceptance());
////		stordetails.setAcceptance(appoint.getAcceptance());
//////////		List<Optional<Appointment>>ds=Arrays.asList(a);
////////		List ab=ds.stream().sorted().collect(Collectors.toList());
//		return  appointmentservice.updateStatusById	(id,appointment);
//	}
	
	
	@DeleteMapping("/appointment/{id}")
	public void deletebyid(@PathVariable Integer id){
		appointmentservice.deleteByid(id);
	}

	

}
