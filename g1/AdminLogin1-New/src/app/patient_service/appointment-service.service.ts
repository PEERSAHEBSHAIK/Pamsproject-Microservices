import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {
  private registerUrl: string;

  constructor(private http: HttpClient) {
    this.registerUrl = 'http://localhost:9003/appointment';
  }
  public appointments(appoint: Appointment) {
    return this.http.post<Appointment>(this.registerUrl, appoint);
  }
}
