import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email!: any
  constructor(public auth: AuthService, public route: Router) {
    this.auth.user$.subscribe({
      // next: (res) => {
      //   if (res?.['role'][0] == 'Physician') {
      //     this.email = res.email;
      //     sessionStorage.setItem("physician_email", this.email);
      //     this.route.navigateByUrl("/physician");
      //   }
      //   else if (res?.['role'][0] == 'Admin') {
      //     this.route.navigateByUrl("/admin");
      //   }
      //   else if (res?.['role'][0] == 'Nurse') {
      //     this.route.navigateByUrl("/nurse");
      //   }
      // }
    });
  }
  ngOnInit(): void {

  }
}
