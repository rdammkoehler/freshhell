import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formGroup: FormGroup;
  hells: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.hells = localStorage.getItem('hells') ? JSON.parse(localStorage.getItem('hells')) : [];
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({hell: ['', [Validators.required], []]});
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.hells = [`${this.formGroup.value.hell} was observed at ${new Date()}`, ...this.hells];
    this.formGroup.reset();
    localStorage.setItem('hells', JSON.stringify(this.hells.slice(0, 1000)));
  }
}
