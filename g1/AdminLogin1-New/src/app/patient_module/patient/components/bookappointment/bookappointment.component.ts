import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisplayDoctorsService } from 'src/app/patient_service/display-doctors.service';
import { Physician } from 'src/app/model_classes/physician';
import { DialogAppointmentComponent } from '../dialog-appointment/dialog-appointment.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent {
  physician: Physician[] = [];
  dataEmail: string = "";
  dataStartDate: string = "";
  dataEndDate: string = "";
  dataSource: any;
  constructor(private dialog: MatDialog, private physicianService: DisplayDoctorsService) {

  }
  ngOnInit() {
    this.physicianService.findPhysician().subscribe(data => {
      this.physician = data;
      this.dataSource = new MatTableDataSource(this.physician);
    });
  }
  openDialog(value1: string, value2: string, value3: string) {
    this.dialog.open(DialogAppointmentComponent, { data: { dataEmail: value1, dataStartDate: value2, dataEndDate: value3 } });
  }
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
