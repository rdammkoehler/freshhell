import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formGroup: FormGroup;
  hells: object[] = [];
  stats = {
    count: 0,
    histogram: []
  }; // probably not very type-scripty
  optIn = false;

  constructor(private formBuilder: FormBuilder) {
    this.hells = localStorage.getItem('hells') ? JSON.parse(localStorage.getItem('hells')) : [];
    this.stats = localStorage.getItem('stats') ? JSON.parse(localStorage.getItem('stats')) : {count: 0};
    this.optIn = localStorage.getItem('optIn') ? JSON.parse(localStorage.getItem('optIn')) : false;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({hell: ['', [Validators.required], []]});
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    const freshHell = {
      description: this.formGroup.value.hell,
      observed: new Date()
    };
    this.hells = [
      freshHell,
      ...this.hells
    ];
    this.formGroup.reset();
    localStorage.setItem('hells', JSON.stringify(this.hells.slice(0, 9)));
    // if (this.stats.histogram) {
    //   const key = freshHell.observed.toLocaleDateString().split('').reverse().join('').replace(/\//g, '');
    //   if (this.stats.histogram[key]) {
    //     this.stats.histogram[key] = this.stats.histogram[key] + 1;
    //   } else {
    //     this.stats.histogram[key] = 1;
    //   }
    // }
    /* So what do you want to track?
      - Total Hells
      - Hells / Timeperiod
      - Average time between observations
      - what else?
      - User settings (but not necessarily here)
        - opt-in for reporting to the cloud
        - ???
     */
    this.stats.count = this.stats.count + 1,
      localStorage.setItem('stats', JSON.stringify(this.stats));
    // IF opt-in, then we should send the fresh hell to a service!
    if (this.optIn) {
      // make an call to the endpoint
    }
  }
}
