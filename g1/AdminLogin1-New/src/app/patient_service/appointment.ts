import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Appointment {
    acceptance: string = "pending";
    date: string = "";
    reason: string = "";
    physcianEmail: string = "";
    patientId: number = 1;
    submissionDate: string = "";
}
