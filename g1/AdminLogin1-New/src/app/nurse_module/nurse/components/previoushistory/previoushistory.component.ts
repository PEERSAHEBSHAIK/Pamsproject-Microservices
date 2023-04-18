import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentDto } from 'src/app/model_classes/appointment';
import { PrescriptionDetails } from 'src/app/model_classes/prescription';
import { TestDetails } from 'src/app/model_classes/test';
import { PatientInfoDetails } from 'src/app/model_classes/visit_details';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientHealthRecordService } from 'src/app/services/patient-health-record.service';



@Component({
  selector: 'app-previoushistory',
  templateUrl: './previoushistory.component.html',
  styleUrls: ['./previoushistory.component.css']
})
export class PrevioushistoryComponent implements OnInit {
  patientVisitDetails: PatientInfoDetails[] = [];
  physicianData: AppointmentDto[] = []
  testDetails: TestDetails[][] = [];
  prescriptionDetails: PrescriptionDetails[][] = [];

  displayedColumnsPrescription: string[] = ['id', 'progress', 'name', 'fruit'];
  displayedColumnsTest: string[] = ['id', 'progress', 'name', 'fruit'];
  dataSourceTest: any[] = [];
  dataSourcePrescription: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: PatientHealthRecordService, private appointmentList: AppointmentService) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource();
  }

  pId: any;
  ngOnInit(): void {
    this.pId = sessionStorage.getItem('arraydata');
    this.service.healthRecords(this.pId).subscribe((visitDetails) => {
      this.patientVisitDetails = visitDetails;
      console.log(this.patientVisitDetails);
      for (let i = 0; i < this.patientVisitDetails.length; i++) {
        console.log(this.patientVisitDetails[i].visitId);
        this.service
          .getPrescriptionDetails(this.patientVisitDetails[i].visitId)
          .subscribe((prescriptionData) => {
            this.prescriptionDetails[i] = prescriptionData;
            console.log(prescriptionData);
            console.log('prescription details');
            console.log(this.prescriptionDetails[i]);
            this.dataSourcePrescription[i] =
              new MatTableDataSource<PrescriptionDetails>(
                this.prescriptionDetails[i]
              );
            console.log(this.dataSourcePrescription);
          });
      }
      for (let i = 0; i < this.patientVisitDetails.length; i++) {
        this.service
          .getTestDetails(this.patientVisitDetails[i].visitId)
          .subscribe((testData) => {
            this.testDetails[i] = testData;
            console.log('testdetails');

            console.log(this.testDetails);

            this.dataSourceTest[i] = new MatTableDataSource<TestDetails>(
              this.testDetails[i]
            );
          });
      }
    });
    console.log('in previous history');

    this.appointmentList.getPreviousPatientAppointments(this.pId).subscribe((data) => {
      this.physicianData = data;
      console.log(this.physicianData);
    });
  }
}

