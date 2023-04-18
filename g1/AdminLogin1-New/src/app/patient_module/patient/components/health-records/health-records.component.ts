import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDto } from 'src/app/model_classes/appointment';
import { PatientInfoDetails } from 'src/app/model_classes/visit_details';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientHealthRecordService } from 'src/app/services/patient-health-record.service';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { TestdetailsComponent } from '../testdetails/testdetails.component';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.css']
})
export class HealthRecordsComponent {
  visits: PatientInfoDetails[] = [];
  patientId: number = 2;
  appointmentId: number = 3;
  appointment: AppointmentDto;
  visit: PatientInfoDetails;
  id2String: string | null = "";

  constructor(public dialog: MatDialog, private savedVisit: PatientHealthRecordService, private savedAppointment: AppointmentService) {
    this.appointment = new AppointmentDto();
    this.visit = new PatientInfoDetails()
  }

  openDialog(visitId: number, appointmentId: number) {
    const dialogRef = this.dialog.open(TestdetailsComponent);
    sessionStorage.setItem("visitIdForTest", visitId.toString());
  }

  openDialog1(visitId: number, appointmentId: number) {
    const dialogRef = this.dialog.open(PrescriptionComponent);
    sessionStorage.setItem("visitIdForPrescription", visitId.toString());
    sessionStorage.setItem("id", appointmentId.toString());
  }

  ngOnInit() {
    this.savedVisit.healthRecords(this.patientId).subscribe(data => {
      this.visits = data;
      console.log(this.visits);
    });

    // this.id2String = sessionStorage.getItem("id");
    // this.appointmentId = parseInt(this.id2String!, 10);
    // this.savedAppointment.findAppointmentById(this.appointmentId).subscribe(data => {
    //   this.appointment = data;
    //   console.log(this.visit);
    // });

  }


  // longtext = "dfdsfivdjkjiajkxnbdsvgyuwijklaxnbvgu";

  // constructor(public dialog: MatDialog) { }

  // openDialog() {
  //   const dialogRef = this.dialog.open(TestdetailsComponent);
  // }

  // openDialog1() {
  //   const dialogRef = this.dialog.open(PrescriptionComponent);
  // }
}
