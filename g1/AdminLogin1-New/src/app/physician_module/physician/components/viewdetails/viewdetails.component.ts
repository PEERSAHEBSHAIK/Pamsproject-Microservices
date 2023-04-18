import { Component } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientBasicInfoService } from 'src/app/services/patient-basic-info.service';
import { PatientHealthRecordService } from 'src/app/services/patient-health-record.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent {
  showContent = false;
  prescription: any
  toggleContent() {
    this.showContent = !this.showContent;
  }
  panelOpenState = false;
  status: String = "accepted";
  id: any
  // let resp1=this.service.getAppointments(this.email,transformdate,this.status);
  // resp1.subscribe((data: any)=>this.patientdetails=data);
  patientdetail: any
  patientVisitdetail: any
  Vistdetails: any
  prescriptions: any[] = [];
  PatientsTests: any[] = [];
  appointmentsHistory: any = []
  visitID: any
  healthRecordService!: PatientHealthRecordService;
  constructor(

    private patientdetails: PatientBasicInfoService,
    private healthRecord: PatientHealthRecordService,
    private appointment: AppointmentService
  ) { }
  ngOnInit(): void {
    const pId = sessionStorage.getItem('Pid')
    const Aid = sessionStorage.getItem('AppointmentId')
    const details = this.patientdetails.getpatientdetails(pId)
    details.subscribe((data) => this.patientdetail = data)
    console.log(Aid);
    const Vistdetails = this.healthRecord.getVisitDetails(Aid);
    Vistdetails.subscribe((data) => {
      this.patientVisitdetail = data
      console.log(this.patientVisitdetail);
      this.visitID = this.patientVisitdetail.visitId;
      console.log(this.visitID + "cdcdc");
      sessionStorage.setItem("VisitId", this.patientVisitdetail.visitId)
    })

    const appointmentHistory = this.appointment.getAppointmentByStatusAndId(pId, this.status)
    appointmentHistory.subscribe((data) => {
      this.appointmentsHistory = data;
      for (let i = 0; i < this.appointmentsHistory.length; i++) {
        this.healthRecordService.getPrescriptionDetails(this.appointmentsHistory[i].id).subscribe((data) => {
          this.prescriptions[i] = data
        });
        this.healthRecordService.getTests(this.appointmentsHistory[i].id).subscribe((data) => {
          this.PatientsTests[i] = data
        });
      }
    })
    // for (let i = 0; i < this.app.length; i++) {
    //   console.log(this.app[i].patientId + 'inside data');
    //   this.service.getpatientdetails(this.app[i].patientId).subscribe((data1: PatientDetails) => {
    //       this.patientData[i] = data1;
    //       console.log(this.patientData[i]);
    //     });
    // }



    //  const prescriptionDetails=this.patientvist.getPrescriptionDetails(sessionStorage.getItem('VisitId'));
    //  prescriptionDetails.subscribe((data)=>{this.prescriptions=data});
    //  console.log(this.prescriptions+"dfgdfge");
    //  console.log(this.prescriptions[0]+"prescription")
  }


  medicines: any[] = [];
  newMedicine: any = { prescriptionName: '', dosage: '', prescriptionNotes: '', visitId: '' };

  addMedicine() {
    this.newMedicine.visitId = this.patientVisitdetail;
    this.medicines.push(this.newMedicine);
    this.newMedicine = { prescriptionName: '', dosage: '', prescriptionNotes: '' };
  }

  removeMedicine(medicine: any) {
    this.medicines = this.medicines.filter(m => m !== medicine);
  }

  Tests: any[] = [];
  newTest: any = { testName: '', testNotes: '', result: '', visitId: '' };

  addTest() {
    this.newTest.visitId = this.patientVisitdetail;
    this.Tests.push(this.newTest);
    this.newTest = { testName: '', testNotes: '', result: '' };
  }

  removeTest(test: any) {
    this.Tests = this.Tests.filter(m => m !== test);
  }

  submitTestAndPrescription(id: any, testss: any, value: any) {
    this.appointment.updateStatusById(sessionStorage.getItem('AppointmentId'), "completed").subscribe();
    testss.visitId = this.patientVisitdetail;
    this.Tests.push(testss);
    console.log("Deepak");
    console.log(this.Tests);
    this.healthRecord.postTest(this.Tests).subscribe();
    this.removeTest(testss);
    this.Tests = [];
    this.newTest = { testName: '', testNotes: '', result: '' };



    this.newMedicine.visitId = this.patientVisitdetail;
    this.medicines.push(value);
    console.log("katiyare");
    console.log(this.medicines);
    this.healthRecord.postPrescription(this.medicines).subscribe()
    this.removeMedicine(value);
    this.medicines = [];
    this.newMedicine = { prescriptionName: '', dosage: '', prescriptionNotes: '', visitId: '' };
    console.log("abc");
    this.ngOnInit()
  }
}
