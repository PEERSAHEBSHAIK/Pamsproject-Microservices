import { Component } from '@angular/core';

@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})
export class IndexpageComponent {
  width = window.innerWidth;
  height = window.innerHeight;
}
