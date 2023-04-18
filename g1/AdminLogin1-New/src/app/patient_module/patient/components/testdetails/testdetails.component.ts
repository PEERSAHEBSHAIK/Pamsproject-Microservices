import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface Test {
  tid: string;
  testname: string;
  result: string;
  status: string;
}
const ELEMENT_DATA: Test[] = [
  { tid: 'T001', testname: 'blood', result: '14 points', status: 'good' },
  { tid: 'T003', testname: 'ear', result: 'hearing level 0 to 20db', status: 'poor' },
  { tid: 'T004', testname: 'eye', result: 'hypermetropia', status: 'good' },
  { tid: 'T005', testname: 'nose', result: 'cold', status: 'good' },
];


@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.css']
})
export class TestdetailsComponent {
  displayedColumns: string[] = ['demo-tid', 'demo-testname', 'demo-result', 'demo-status'];
  dataSource = new MatTableDataSource<Test>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // constructor(public dialog: MatDialog) {}

  // openDialog() {
  //   const dialogRef = this.dialog.open(PrescriptionComponent);
  // }

  constructor(private dialogRef: MatDialogRef<TestdetailsComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
