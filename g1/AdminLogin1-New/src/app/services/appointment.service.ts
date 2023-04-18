import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDto } from '../model_classes/appointment';
import { Patient } from '../model_classes/Patient';
import { PatientInfoDetails } from '../model_classes/visit_details';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(public http: HttpClient) { }

  //To get All the accepted appointments
  public getAppointments(): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(
      'http://localhost:9003/appointments/accepted'
    );
  }
  //To get status of the appointment by the patient id
  public getAppointmentByStatusAndId(id: any, status: any): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>("http://localhost:9003/appointment/" + id + "/" + status);
  }

  //to book the  appointment for patient
  public bookAppointment(appointment: AppointmentDto) {
    return this.http.post<AppointmentDto>("http://localhost:9003/appointment", appointment);
  }

  //to update the status of the appointment by the id
  public updateStatusById(id: any, status: any): Observable<AppointmentDto> {
    return this.http.put<AppointmentDto>("http://localhost:9003/appointment/" + id + "/" + status, "");
  }

  //to update the appointments
  public updateAppointment(appointment: AppointmentDto): Observable<AppointmentDto> {
    return this.http.put<AppointmentDto>("http://localhost:9003/appointment", appointment);
  }

  public getAppointmentBYEmailAndDateAndStatus(email: any, date: any, status: any): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>("http://localhost:9003/appointments/" + email + "/" + date + "/" + status);
  }

  public findAppointmentById(id: any): Observable<AppointmentDto> {
    return this.http.get<AppointmentDto>("http://localhost:9003/appointment/" + id);
  }
  public sendPatientInfo(patient: PatientInfoDetails, patientId: any) {
    return this.http.post<PatientInfoDetails>(
      'http://localhost:9007/api/v1/patient/' + patientId + '/visits',
      patient
    );
  }
  public getPreviousPatientAppointments(patientId: any): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>('http://localhost:9003/appointment/' + patientId + '/accepted');
  }

}
