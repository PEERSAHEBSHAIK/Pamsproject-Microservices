import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopComponent } from '../dialog-pop/dialog-pop.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { Physician } from 'src/app/model_classes/physician';
import { PhysicianAvailabilityService } from 'src/app/services/physician-availability.service';



export interface Availability {
  id: number;
  name1: string;
  from: number;
  till: number;

}


const PHY_DATES: Availability[] = [
  { id: 1, name1: 'Akshay', from: 1.0079, till: 12254 },
  { id: 2, name1: 'Helium', from: 11 / 11 / 2001, till: 12254 },
  { id: 3, name1: 'Lithium', from: 6.941, till: 12254 },
  { id: 4, name1: 'Beryllium', from: 9.0122, till: 12254 },
  { id: 5, name1: 'Boron', from: 10.811, till: 12254 },
  { id: 6, name1: 'Carbon', from: 12.0107, till: 12254 },
  { id: 7, name1: 'Nitrogen', from: 14.0067, till: 12254 },
  { id: 8, name1: 'Oxygen', from: 15.9994, till: 12254 },
  { id: 9, name1: 'Fluorine', from: 18.9984, till: 12254 },
  { id: 10, name1: 'Neon', from: 20.1797, till: 12254 },
  { id: 11, name1: 'Sodium', from: 22.9897, till: 12254 },
  { id: 12, name1: 'Magnesium', from: 24.305, till: 12254 },
  { id: 13, name1: 'Aluminum', from: 26.9815, till: 12254 },
  { id: 14, name1: 'Silicon', from: 28.0855, till: 12254 },
  { id: 15, name1: 'Phosphorus', from: 30.9738, till: 12254 },
  { id: 16, name1: 'Sulfur', from: 32.065, till: 12254 },
  { id: 17, name1: 'Chlorine', from: 35.453, till: 12254 },
  { id: 18, name1: 'Argon', from: 39.948, till: 12254 },
  { id: 19, name1: 'Potassium', from: 39.0983, till: 12254 },
  { id: 20, name1: 'Calcium', from: 40.078, till: 12254 },
];

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})


export class PhysicianComponent {
  physicianAvailabilityArr: Physician[] = [];
  displayedColumns: string[] = ['email', 'name', 'speciality', 'from', 'till', 'actions', 'delete'];
  dataSource: any;

  matDialog: any;
  physicianAvail: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private matDialogCon: MatDialog, private physicianAvailability: PhysicianAvailabilityService) {
    this.matDialog = matDialogCon;
    this.physicianAvail = physicianAvailability;
  }
  ngOnInit() {
    this.getAllPhysicianAvailability();
  }
  getAllPhysicianAvailability() {
    this.physicianAvail.findAllAvailability().subscribe((data: Physician[]) => {
      console.log(data);
      this.physicianAvailabilityArr = data;
      this.dataSource = new MatTableDataSource<Physician>(this.physicianAvailabilityArr);
      this.dataSource.paginator = this.paginator;
    });
  }
  openDialog(value: any) {
    this.matDialog.open(DialogPopComponent, {
      width: '400px',
      data: {
        availability: value,
      }
    })

  }
  deleteDialog(email: string) {
    this.matDialog.open(DeletePopupComponent, {
      width: '400px',
      data: {
        physicianEmail: email,
        object: this
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggle(value: any) {
    value.available = !value.available;
    console.log(value);
    console.log("inside toggle " + value);

    this.physicianAvail.update(value).subscribe();
    this.getAllPhysicianAvailability();
  }
}