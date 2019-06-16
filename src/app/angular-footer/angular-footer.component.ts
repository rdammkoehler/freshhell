import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-footer',
  templateUrl: './angular-footer.component.html',
  styleUrls: ['./angular-footer.component.css']
})
export class AngularFooterComponent implements OnInit {
  message: string;

  constructor() { }

  ngOnInit() {
    this.message = '';
  }

}
