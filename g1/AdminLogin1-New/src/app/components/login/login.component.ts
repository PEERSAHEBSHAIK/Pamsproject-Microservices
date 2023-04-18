import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model_classes/Patient';
import { PatientBasicInfoService } from 'src/app/services/patient-basic-info.service';
import { PatientRegisterService } from 'src/app/services/patient-register.service';
import { RegisterDialogComponent } from '../dialog-pop/dialog-pop.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  showError: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'you must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  patients: Patient[] = [];
  private patient!: Patient
  constructor(private matDialog: MatDialog, private patientRegister: PatientRegisterService, private patientInfo: PatientBasicInfoService, private router: Router) { }
  ngOnInit() {
    this.patientInfo.getPatients().subscribe(data => {
      this.patients = data;
    });
  }
  onSubmit(value: any): void {
    if (this.patientRegister.loginPatient(value.email, value.password).subscribe(result => {
      sessionStorage.setItem("PATIENT_ID", result.patientId);
    })) {
      this.router.navigate(['/patient']);
    }
    else {

    }
  }
  loginDialog() {
    this.matDialog.open(RegisterDialogComponent, {
      width: '300px',
      data: {
        value: "Login Unsuccessful!"
      }
    })
  }
}
