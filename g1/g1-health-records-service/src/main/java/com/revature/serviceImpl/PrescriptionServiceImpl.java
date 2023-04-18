package com.revature.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.revature.entity.Nurse;
import com.revature.entity.Prescription;
import com.revature.entity.VisitDetails;
import com.revature.exception.VisitNotFound;
import com.revature.payload.PrescriptionDto;
import com.revature.repository.NurseRepo;
import com.revature.repository.PrescriptionRepository;
import com.revature.repository.VisitRepository;
import com.revature.service.PrescriptionService;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

	@Autowired
	private PrescriptionRepository prescriptionRepository;

	@Autowired
	private VisitRepository visitRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	private NurseRepo nurseRepo;

	@Override
	public List<PrescriptionDto> getPrescriptionDetails(int visitId) {
		VisitDetails v = visitRepository.findById(visitId)
				.orElseThrow(() -> new VisitNotFound(String.format("Visit Id %d not found", visitId)));
		List<Prescription> medicines = prescriptionRepository.findAllByVisitId(v);
		return medicines.stream().map(medicine -> modelMapper.map(medicine, PrescriptionDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<PrescriptionDto> saveVisit(List<PrescriptionDto> prescriptionDto) {
		List<Prescription> list = prescriptionDto.stream()
				.map(entity->modelMapper.map(entity,Prescription.class))
				.collect(Collectors.toList()); 
		List<PrescriptionDto> dtoList = prescriptionRepository.saveAll(list).stream()
			    .map(entity -> modelMapper.map(entity, PrescriptionDto.class))
			    .collect(Collectors.toList());
		return dtoList;
	}

	@Override
	public PrescriptionDto updatePrescription(PrescriptionDto prescriptionDto, int prescriptionId) {
		Prescription p = prescriptionRepository.findById(prescriptionId).get();
		p.setPrescriptionName(prescriptionDto.getPrescriptionName());
		p.setDosage(prescriptionDto.getDosage());
		p.setPrescriptionNotes(prescriptionDto.getPrescriptionNotes());
		prescriptionRepository.saveAndFlush(p);
		return modelMapper.map(p, PrescriptionDto.class);
	}

	@Override
	public void deletePrescription(int prescriptionId) {
		prescriptionRepository.deleteById(prescriptionId);

	}

	public List<Nurse> getNurseFromAuth() throws UnirestException {
		String request = "https://dev-85rf4haa0cxb2bmc.us.auth0.com/api/v2/users";
		HttpResponse<String> response = Unirest.get(request)
				.header("authorization",
						"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjR5MmFCTHF4Ym9xUjIzdFhGZDhtaSJ9.eyJpc3MiOiJodHRwczovL2Rldi04NXJmNGhhYTBjeGIyYm1jLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJPSUVRQnBhbkF3V1Byc0NlNGQzbjRuZzF5TGtNV0xNZEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtODVyZjRoYWEwY3hiMmJtYy51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4MDEyNDc1MywiZXhwIjoxNjgwMjExMTUzLCJhenAiOiJPSUVRQnBhbkF3V1Byc0NlNGQzbjRuZzF5TGtNV0xNZCIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Ii2cD29FZWapSwOkznsUbdE3LDAq__9MOUDCac7mdn5MlKaXQoLGxhYaiRHU27n8jtaI5Pp9QiiAXrqa3nXFuKFJGDAOl-FLedpgO7yi8uYzC_chu3P0cRhnXdS7ee92N961Hp65PqbAMkEs8LsXxwbloQ21jYDCOj0t73OxIPmXOKu_oEq95_h78PDXp_o5NjdfGkO2mcw4glso2sJcHRrCBjkilyn_trTMsQV-jwZLHXf37gKHsDfN60DGo17nX989ulfZYaJLTF0OEKc1JQAHo3z5_LEMAxzY0_q_xlSES6pAA-nahSHYg52h0CzoulamMVvS-p-H-seRcNp2pA")
				.asString();
		System.out.println(response.getBody());
		JsonNode jsonNode = null;
		ArrayList<Nurse> nurses = new ArrayList<>();
		try {
			jsonNode = objectMapper.readTree(response.getBody());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < jsonNode.size(); i++) {
			System.out.println(jsonNode.get(i) + "/n");
			Nurse nurse = new Nurse();
			String role = jsonNode.get(i).get("user_metadata").get("role").textValue();
			if (role.equalsIgnoreCase("Nurse")) {
				nurse.setNurseRole(role);
				nurse.setNurseEmail(jsonNode.get(i).get("email").textValue());
				nurse.setNurseName(jsonNode.get(i).get("name").textValue());
				nurses.add(nurse);
			}
		}
		return nurses;
	}

	public List<Nurse> addNurse(List<Nurse> nurses) {
		return nurseRepo.saveAll(nurses);
	}

}
