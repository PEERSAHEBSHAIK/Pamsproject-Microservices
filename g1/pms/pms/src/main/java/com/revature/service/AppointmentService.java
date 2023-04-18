package com.revature.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.dao.AppointmentInterface;
import com.revature.dto.AppoinmentDto;
import com.revature.model.Appointment;


@Service
public class AppointmentService {
	@Autowired
	private AppointmentInterface apponitment;
	
	Appointment appo=new Appointment();
	
	public Appointment getAppointment(Appointment appointment){
		return apponitment.save(appointment);
		
	}
	public List<Appointment> getAppointments(String physcianEmail,String date,String accptence){
		return apponitment.findBystatusanddate(physcianEmail,date,accptence);
		
	}
	
	public List<Appointment> getAppointments(String accptence){
		return apponitment.findBystatus(accptence);
		
	}
	
	public List<Appointment> getPatientsAppointments(Integer id,String status){
		return apponitment.findByPatient_ID(id,status);
		
	}
	public Appointment getAppointmentsService(int id){
		return apponitment.findById(id).get();
	}
	public void updateById(Integer id,String status) {
		apponitment.updatebyid(status, id);
	}
	
	public List<Appointment> store(List<Appointment> list){
		return apponitment.saveAll(list);
	}
	public Appointment updateStatus(Appointment appointment){
		return apponitment.save(appointment);
		
	}
	
	
	public Appointment updateStatusById(int ID,Appointment appointment){
		Appointment details=apponitment.findById(ID).orElse(null);
		System.out.println(details);
		details.setAcceptance(appointment.getAcceptance());
		return apponitment.save(details);
		
	}
	
	public void deleteByid(Integer id) {
		apponitment.deleteById(id);
	}
	}
