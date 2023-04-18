import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { concatMap, map, tap } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';
import { PhysicianAvailabilityService } from 'src/app/services/physician-availability.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count: any;
  constructor(public auth: AuthService, public physician: PhysicianAvailabilityService) {
  }

  ngOnInit(): void {
    this.physician.getCount().subscribe({
      next: (count) => {
        this.count = count;
        console.log(this.count);
      }
    });
  }
}

