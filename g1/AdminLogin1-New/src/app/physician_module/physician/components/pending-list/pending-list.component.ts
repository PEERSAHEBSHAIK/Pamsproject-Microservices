import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Patient } from 'src/app/model_classes/Patient';
import { AppointmentDto } from 'src/app/model_classes/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientBasicInfoService } from 'src/app/services/patient-basic-info.service';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit {
  app: AppointmentDto[] = []
  patientData: Patient[] = []


  status: String = "pending"
  @Input() receivedParentMessage: string = '';


  patientdetails: any;

  email: any;
  constructor(private service: AppointmentService, private patient: PatientBasicInfoService) {
    this.email = sessionStorage.getItem("physician_email");
  }

  ngOnInit(): void {
    this.getPendingAppointMents();
  }
  ngOnChanges() {
    var date = new Date();
    var transformdate = this.currentDate.transform(date, 'dd-MMM-yyyy')
    let resp1 = this.service.getAppointmentBYEmailAndDateAndStatus(this.email, transformdate, this.status);
    resp1.subscribe((data: any) => this.patientdetails = data);
    console.log(transformdate + "this.today");
  }

  selectDate: any
  SelectBydate(SelectedDate: string) {
    console.log(SelectedDate)
    this.selectDate = SelectedDate

    const SelectByDate = this.currentDate.transform(this.selectDate, 'dd-MMM-yyyy');
    console.log(SelectByDate + "abcdefghi")

    this.service.getAppointmentBYEmailAndDateAndStatus(this.email, SelectByDate, this.status).subscribe((data: AppointmentDto[]) => {
      console.log(data);
      this.app = data;
      for (let i = 0; i < this.app.length; i++) {
        console.log(this.app[i].patientId + 'inside data');
        this.patient.getpatientdetails(this.app[i].patientId).subscribe((data1: Patient) => {
          this.patientData[i] = data1;
          console.log(data1.firstName);
          console.log(this.patientData[i].firstName);
        });
      }
    });
  }

  currentDate: DatePipe = new DatePipe('en-us');
  now: DatePipe = new DatePipe('en-us');
  tmrw: DatePipe = new DatePipe('en-us');
  id: any = null;
  tran: any;
  appointment: any = {};


  // patientId!: number;


  acceptAppointment(id: any) {
    this.service.updateStatusById(id, "accepted").subscribe();
    console.log(id);
    this.getPendingAppointMents();
  }

  rejectAppointment(id: any) {
    console.log(this.id)
    console.log(id)
    this.service.updateStatusById(id, "rejected").subscribe();
    this.getPendingAppointMents();

  }





  getCurrentDate(event: MatTabChangeEvent) {
    var date = new Date();
    var transformdate = this.currentDate.transform(date, 'dd-MMM-yyyy')
    const tab = event.tab.textLabel;
    if (tab == 'Today') {
      console.log(transformdate + "dsgsg");
      this.service.getAppointmentBYEmailAndDateAndStatus(this.email, transformdate, this.status).subscribe((data: AppointmentDto[]) => {
        console.log(data);
        this.app = data;
        for (let i = 0; i < this.app.length; i++) {
          console.log(this.app[i].patientId + 'inside data');
          this.patient.getpatientdetails(this.app[i].patientId).subscribe((data1: Patient) => {
            this.patientData[i] = data1;
            console.log(data1.firstName);
            console.log(this.patientData[i].firstName);
          });
        }
      });
      // return transformdate;
      // let resp1=this.service.getPatientAcceptDetails(this.today);
      // console.log(this.today);
      // resp1.subscribe((data: any)=>this.patientdetails=data);
    }
    else if (tab == 'Tommorrow') {
      var date = new Date();
      const transform = this.currentDate.transform(date, 'dd-MMM-yyyy');
      const tmrw = new Date(date.setDate(date.getDate() + 1));
      const tmm = this.tmrw.transform(tmrw, 'dd-MMM-yyyy');
      this.service.getAppointmentBYEmailAndDateAndStatus(this.email, tmm, this.status).subscribe((data: AppointmentDto[]) => {
        console.log(data);
        this.app = data;
        for (let i = 0; i < this.app.length; i++) {
          console.log(this.app[i].patientId + 'inside data');
          this.patient.getpatientdetails(this.app[i].patientId).subscribe((data1: Patient) => {
            this.patientData[i] = data1;
            console.log(data1.firstName);
            console.log(this.patientData[i].firstName);
          });
        }
      });
      // return transformdate;
    }
    else {
      return;
    }
  }

  getPendingAppointMents() {
    var date = new Date();
    var transformdate = this.currentDate.transform(date, 'dd-MMM-yyyy')
    this.service.getAppointmentBYEmailAndDateAndStatus(this.email, transformdate, this.status).subscribe((data: AppointmentDto[]) => {
      console.log(data);
      this.app = data;
      for (let i = 0; i < this.app.length; i++) {
        console.log(this.app[i].patientId + 'inside data');
        this.patient.getpatientdetails(this.app[i].patientId).subscribe((data1: Patient) => {
          console.log();
          this.patientData[i] = data1;
        });
      }
    });
  }
}
