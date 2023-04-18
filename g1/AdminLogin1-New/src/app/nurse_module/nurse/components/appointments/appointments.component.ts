import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentDto } from 'src/app/model_classes/appointment';
import { Patient } from 'src/app/model_classes/Patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientBasicInfoService } from 'src/app/services/patient-basic-info.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  app: AppointmentDto[] = [];
  patientData: Patient[] = [];
  variable: any;
  dataSource: any;
  constructor(public patientInfo: PatientBasicInfoService, private appointment: AppointmentService) { }

  ngOnInit(): void {
    this.appointment.getAppointments().subscribe((data: AppointmentDto[]) => {
      console.log(data);
      this.app = data;
      this.dataSource = new MatTableDataSource<AppointmentDto>(this.app);
      for (let i = 0; i < this.app.length; i++) {
        this.patientInfo
          .getpatientdetails(this.app[i].patientId)
          .subscribe((data1: Patient) => {
            this.patientData[i] = data1;
            console.log(this.patientData[i]);
          });
      }
    });
  }
  particularPatient: any;

  id(data: any, appId: any, phyEmail: any) {
    sessionStorage.setItem('arraydata', this.patientData[data].patientId);
    sessionStorage.setItem('appId', appId);
    sessionStorage.setItem('physicianEmail', phyEmail);
    console.log(this.patientData[data].patientId);
    console.log('appointment id is');

    console.log(appId);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
