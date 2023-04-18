import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model_classes/Patient';
import { PatientInfoDetails } from 'src/app/model_classes/visit_details';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppsubService } from 'src/app/services/appsub.service';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.css']
})
export class SubmitDialogComponent {
  email: string = '';
  physicianAvail: any;
  deletePhysician: any;
  patientIdd: any;

  data: PatientInfoDetails = new PatientInfoDetails();

  constructor(
    private shared: AppsubService,
    private service: AppointmentService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) private dataa: any
  ) {
    this.data = this.dataa.submitPatienttDetails;
    this.patientIdd = this.dataa.patientInfoId;
  }
  submit() {
    this.service.sendPatientInfo(this.data, this.patientIdd).subscribe();
    console.log("Inside the dialog");
    this.route.navigateByUrl('/nurse/appointments');
  }
}
