import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Patient } from 'src/app/model_classes/Patient';
import { PatientInfoDetails } from 'src/app/model_classes/visit_details';
import { AppsubService } from 'src/app/services/appsub.service';
import { PatientBasicInfoService } from 'src/app/services/patient-basic-info.service';
import { PrevioushistoryComponent } from '../previoushistory/previoushistory.component';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';

@Component({
  selector: 'app-addpatientinfo',
  templateUrl: './addpatientinfo.component.html',
  styleUrls: ['./addpatientinfo.component.css']
})
export class AddpatientinfoComponent {
  public myForm!: FormGroup;
  constructor(
    public dialog: MatDialog,
    public patientService: PatientBasicInfoService,
    private shared: AppsubService
  ) { }
  // constructor(public patientData : AppointmentService){}

  selectedItem: any;

  toppings = new FormControl('');

  toppingList: string[] = [
    'Skin Allergy',
    'Eye Allergy',
    'Nose Allergy',
    'Food Allergy',
    'Dust Allergy',
    'Dust Allergy',
    'Dust Allergy',
    'Dust Allergy',
  ];

  openDialog() {
    const dialogRef = this.dialog.open(PrevioushistoryComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  appointmentAppointmentsId: any;
  phys: any;
  patientData: any;
  patient!: Patient;
  ngOnInit(): void {
    this.patientData = sessionStorage.getItem('arraydata');
    this.patientService.getpatientdetails(this.patientData).subscribe((data) => {
      this.patient = data;
    });

    this.appointmentAppointmentsId = sessionStorage.getItem('appId');
    this.phys = sessionStorage.getItem('physicianEmail');

    this.myForm = new FormGroup({
      myName: new FormControl('', [Validators.required]),
      myAddress: new FormControl('', [Validators.required]),
      mycity: new FormControl('', [Validators.required]),
      bloodPressure: new FormControl('', [Validators.required]),
      heightt: new FormControl('', [Validators.required]),
      bpSystolic: new FormControl('', [Validators.required]),
      weightt: new FormControl('', [Validators.required]),
      bpDiastolic: new FormControl('', [Validators.required]),
      respirationRate: new FormControl('', [Validators.required]),
      bodyTemperature: new FormControl('', [Validators.required]),
      allergies: new FormControl('', [Validators.required]),
      sugar: new FormControl('', [Validators.required]),
      // somethingData: new FormControl('', [Validators.required]),
    });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  };

  patientDetails: PatientInfoDetails = new PatientInfoDetails();
  patientDataa: PatientInfoDetails = new PatientInfoDetails();
  onSubmitt(patientDataa: any) {
    console.log(patientDataa);
    this.patientDetails.height = patientDataa.heightt;
    this.patientDetails.weight = patientDataa.weightt;
    this.patientDetails.bpSystolic = patientDataa.bpSystolic;
    this.patientDetails.bpDiastolic = patientDataa.bpDiastolic;
    this.patientDetails.bodyTemparature = patientDataa.bodyTemperature;
    this.patientDetails.respirationRate = patientDataa.respirationRate;
    this.patientDetails.bloodGroup = 'O+';
    this.patientDetails.nurseEmail = 'nurseemail1';
    this.patientDetails.physicianEmail = this.phys;
    this.patientDetails.appointmentId = this.appointmentAppointmentsId;
    this.patientDetails.keyNotes = patientDataa.somethingData;
    this.patientDetails.allergyId = '1';
    if (patientDataa != null) {
      this.dialog.open(SubmitDialogComponent, {
        width: '400px',
        data: {
          submitPatienttDetails: this.patientDetails,
          patientInfoId: this.patientData,
        },
      });
    }
  }
}
