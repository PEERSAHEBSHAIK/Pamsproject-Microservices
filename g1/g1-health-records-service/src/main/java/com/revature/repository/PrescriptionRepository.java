package com.revature.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.entity.Prescription;
import com.revature.entity.VisitDetails;
import com.revature.payload.PrescriptionDto;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {

	List<Prescription> findAllByVisitId(VisitDetails v);

	Object saveAndFlush(PrescriptionDto prescriptionDto);

}