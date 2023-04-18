import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppointmentDto } from 'src/app/model_classes/appointment';
import { Patient } from 'src/app/model_classes/Patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientBasicInfoService } from 'src/app/services/patient-basic-info.service';
import { setsEqual } from 'chart.js/dist/helpers/helpers.core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  app: AppointmentDto[] = []
  patientData: Patient[] = []

  patientdetails: any;
  today: any;
  public hell: string = '';
  status: String = "accepted";
  email: any;
  constructor(private service: AppointmentService, private patient: PatientBasicInfoService) {
    this.email = sessionStorage.getItem("physician_email");
    console.log(this.email + "fffffffffffffffffffffffffffffffffffffff")
  }
  // constructor(private PatientIdservice:PatientIdService){ }


  currentDate: DatePipe = new DatePipe('en-us');
  now: DatePipe = new DatePipe('en-us');
  tmrw: DatePipe = new DatePipe('en-us');

  tran: any;
  datePicker: any;
  public onDate(event: any): void {
    this.datePicker = event;
    console.log(this.datePicker);
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
          console.log(this.patientData[i]);
        });
      }
    });

  }
  getCurrentDate(event: MatTabChangeEvent) {



    var date = new Date();

    var transformdate = this.currentDate.transform(date, 'dd-MMM-yyyy')
    const tab = event.tab.textLabel;
    this.today = transformdate;
    this.hell = this.today;
    if (tab == 'Today') {
      console.log(this.today + "this.today");
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
      // let resp1=this.service.getAppointments(this.email,tmm,this.status);
      // resp1.subscribe((data: any)=>this.patientdetails=data);
      // console.log(tmm+"tommorow");


      this.service.getAppointmentBYEmailAndDateAndStatus(this.email, tmm, this.status).subscribe((data: AppointmentDto[]) => {
        console.log(data);
        this.app = data;
        for (let i = 0; i < this.app.length; i++) {
          console.log(this.app[i].patientId + 'inside data');
          this.patient.getpatientdetails(this.app[i].patientId).subscribe((data1: Patient) => {
            this.patientData[i] = data1;
            console.log(this.patientData[i]);
          });
        }
      });
      // return transformdate;
    }



  }
  setid: any
  setpaientId(id: any) {
    const pId = sessionStorage.setItem('Pid', id)
    // console.log(id+"cardcomp");
    // this.setid=id;
    // this.Paservice.setPatientId(this.setid)
    // console.log(this.setid+"this.dat")
    // // this.setid=this.PatientIdservice.setPatientId(id)

  }
  setAppointmentId(Aid: any) {
    const Appointmentid = sessionStorage.setItem("AppointmentId", Aid)
  }

  // abc(){
  //   this.service.getAppointments(this.email,transformdate,this.status).subscribe((data: AppointmentDto[]) => {
  //     console.log(data);
  //     this.app = data;
  //     for (let i = 0; i < this.app.length; i++) {
  //       console.log(this.app[i].patientId + 'inside data');
  //       this.service
  //         .getpatientdetails(this.app[i].patientId)
  //         .subscribe((data1: PatientDetails) => {
  //           this.patientData[i] = data1;
  //           console.log(this.patientData[i]);
  //         });
  //     }
  //   });
  // }
  ngOnInit(): void {

    var date = new Date();
    var transformdate = this.currentDate.transform(date, 'dd-MMM-yyyy')
    // let resp1=this.service.getAppointments(this.email,transformdate,this.status);
    // resp1.subscribe((data: any)=>this.patientdetails=data);
    // console.log(transformdate+"this.today");
    this.service.getAppointmentBYEmailAndDateAndStatus(this.email, transformdate, this.status).subscribe((data: AppointmentDto[]) => {
      console.log(data);
      this.app = data;
      for (let i = 0; i < this.app.length; i++) {
        console.log(this.app[i].patientId + 'inside data');
        this.patient.getpatientdetails(this.app[i].patientId).subscribe((data1: Patient) => {
          this.patientData[i] = data1;
          console.log(this.patientData[i]);
        });
      }
    });
  }


}
