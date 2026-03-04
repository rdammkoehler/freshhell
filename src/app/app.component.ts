import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AngularFooterComponent} from './angular-footer/angular-footer.component';

export interface Hell {
  description: string;
  observed: Date;
}

export interface Stats {
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, AngularFooterComponent]
})
export class AppComponent implements OnInit {

  formGroup: FormGroup;
  hells: Hell[] = [];
  stats: Stats = {count: 0};

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({hell: ['', [Validators.required], []]});
    this.loadFromStorage();
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    const freshHell: Hell = {
      description: this.formGroup.value.hell,
      observed: new Date()
    };
    this.hells = [freshHell, ...this.hells].slice(0, 9);
    this.formGroup.reset();
    localStorage.setItem('hells', JSON.stringify(this.hells));
    this.stats.count = this.stats.count + 1;
    localStorage.setItem('stats', JSON.stringify(this.stats));
  }

  private loadFromStorage(): void {
    try {
      const hellsJson = localStorage.getItem('hells');
      this.hells = hellsJson ? JSON.parse(hellsJson) : [];
    } catch {
      this.hells = [];
    }

    try {
      const statsJson = localStorage.getItem('stats');
      this.stats = statsJson ? JSON.parse(statsJson) : {count: 0};
    } catch {
      this.stats = {count: 0};
    }
  }
}
