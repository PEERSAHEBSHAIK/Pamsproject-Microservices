import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../model_classes/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientRegisterService {

  private patientRegisterUrl: string;

  private loginUrl: string
  constructor(private http: HttpClient) {

    this.patientRegisterUrl = "http://localhost:9004/api/v1/patient/register";
    this.loginUrl = "http://localhost:9004/api/v1/patient/login";
  }

  public registerPatient(patient: Patient): Observable<Patient> {
    console.log("register");
    console.log(patient);
    return this.http.post<Patient>(this.patientRegisterUrl, patient);
  }

  public loginPatient(email: string, password: string): Observable<Patient> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email", email);
    queryParams = queryParams.append("password", password);
    return this.http.get<Patient>(this.loginUrl, { params: queryParams });
  }
}
