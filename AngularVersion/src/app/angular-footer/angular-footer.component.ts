import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-footer',
  templateUrl: './angular-footer.component.html',
  styleUrls: ['./angular-footer.component.css'],
  standalone: true
})
export class AngularFooterComponent implements OnInit {
  // TODO [LOW] Dead property: `message` is always set to an empty string in ngOnInit and is never
  //   updated or bound to an @Input(). The template renders `{{message}}` which outputs nothing.
  //   If a dynamic message is not planned, remove the property, the ngOnInit, and the binding from
  //   the template. If it is intended to be configurable by the parent, convert it to an @Input().
  message: string;

  constructor() { }

  ngOnInit() {
    this.message = '';
  }

}
