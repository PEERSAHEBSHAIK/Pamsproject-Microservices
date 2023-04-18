import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrescriptionDetails } from 'src/app/model_classes/prescription';
import { PatientInfoDetails } from 'src/app/model_classes/visit_details';
import { PatientHealthRecordService } from 'src/app/services/patient-health-record.service';


export interface Prescription {
  prid: string;
  medicine: string;
  dosage: string;
  notes: string;
}

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent {
  prescription: PrescriptionDetails[] = [];
  displayedColumns: string[] = ['prescriptionId', 'prescriptionName', 'dosage', 'prescriptionNotes'];
  dataSource: any;
  idString: string | null = "";
  visitId: number = 0;
  visit: PatientInfoDetails;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialogRef: MatDialogRef<PrescriptionComponent>, private prescriptionService: PatientHealthRecordService, private visitService: PatientHealthRecordService) {
    this.visit = new PatientInfoDetails();
  }

  ngOnInit() {
    this.prescriptionService.getPrescription().subscribe(data => {
      this.prescription = data;
      console.log(this.prescription);
      this.dataSource = new MatTableDataSource<PrescriptionDetails>(this.prescription);
      this.dataSource.paginator = this.paginator;
    });
    this.idString = sessionStorage.getItem("visitIdForPrescription");
    this.visitId = parseInt(this.idString!, 10);
    this.visitService.visitDetails(this.visitId).subscribe(data => {
      this.visit = data;
      console.log(this.visit);
    });
  }
  closeDialog() {
    this.dialogRef.close();
    sessionStorage.removeItem("visitIdForTest");
  }
}
