import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model_classes/Patient';
import { CustomDatePipePipe } from 'src/app/patient_service/custom-date-pipe.pipe';
import { PatientBasicInfoService } from 'src/app/services/patient-basic-info.service';
import { PatientRegisterService } from 'src/app/services/patient-register.service';
import { RegisterDialogComponent } from '../dialog-pop/dialog-pop.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-patient-regi',
  templateUrl: './patient-regi.component.html',
  styleUrls: ['./patient-regi.component.css']
})
export class PatientRegiComponent {
  private patient: Patient;
  myForm: any;
  hide = true;
  check = false;
  patients: Patient[] = [];
  constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private patientInfo: PatientBasicInfoService, private patientRegister: PatientRegisterService, private router: Router) {
    this.patient = new Patient();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      eMail: new FormControl('', [Validators.required, Validators.email]),
      number: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      ConfirmPassword: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      bodyTemperature: new FormControl('', [Validators.required]),
      allergies: new FormControl('', [Validators.required]),
      sugar: new FormControl('', [Validators.required]),

    });
    this.patientInfo.getPatients().subscribe(data => {
      this.patients = data;
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  };

  onSubmit(value: any): void {
    console.log(this.patients);
    if (this.patients != null) {
      for (var p of this.patients) {
        if (p.email == value.email) {
          this.check = true;
          console.log(p.email);
        }
      }
    }
    if (!this.check) {
      this.patient.title = value.title;
      this.patient.firstName = value.firstName;
      this.patient.lastName = value.lastName;
      this.patient.email = value.email;
      this.patient.contactNumber = value.contact;
      this.patient.dob = new CustomDatePipePipe('en-us').transform(value.dob, 'dd-MMM-yyyy');
      this.patient.gender = value.gender;
      this.patient.address = value.address;
      this.patient.password = value.password;
      console.log(this.patient);
      this.patientRegister.registerPatient(this.patient).subscribe((result) => {
        this.patients.push(result);
        this.registerDialog();
      });
    }
    else {
      this.openSnackBar();
    }
    this.check = false;
  }
  gotoUserList() {
    this.router.navigate(['login']);
  }
  registerDialog() {
    this.matDialog.open(RegisterDialogComponent, {
      width: '300px',
      data: {
        value: "Successfully Registered!"
      }
    })

  }
  openSnackBar() {
    this._snackBar.open('Please choose another email', 'Close', {
      duration: 3000
    });

  }
}
