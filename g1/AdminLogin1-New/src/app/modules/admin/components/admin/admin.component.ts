import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { DialogPopComponent } from '../dialog-pop/dialog-pop.component';

export interface Availability {
  id: number;
  name1: string;
  email: string
}


const PHY_DATES: Availability[] = [
  { id: 9, name1: 'Fluorine', email: '1@gmail.com' },
  { id: 10, name1: 'Neon', email: '1@gmail.com' },
  { id: 11, name1: 'Sodium', email: '1@gmail.com' },
  { id: 12, name1: 'Magnesium', email: '1@gmail.com' },
  { id: 13, name1: 'Aluminum', email: '1@gmail.com' },
  { id: 14, name1: 'Silicon', email: '1@gmail.com' },
  { id: 15, name1: 'Phosphorus', email: '1@gmail.com' },
  { id: 16, name1: 'Sulfur', email: '1@gmail.com' },
  { id: 17, name1: 'Chlorine', email: '1@gmail.com' },
  { id: 18, name1: 'Argon', email: '1@gmail.com' },
  { id: 19, name1: 'Potassium', email: '1@gmail.com' },
  { id: 20, name1: 'Calcium', email: '1@gmail.com' },
];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions', 'delete'];
  dataSource = new MatTableDataSource<Availability>(PHY_DATES);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matDialog: MatDialog) { }

  openDialog() {
    this.matDialog.open(DialogPopComponent, {
      width: '400px',
    })
  }

  deleteDialog() {
    this.matDialog.open(DeletePopupComponent, {
      width: '400px'
    })
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
