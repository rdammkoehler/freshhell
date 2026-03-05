import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with empty hells array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.hells).toEqual([]);
  });

  it('should initialize stats count to zero', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.stats.count).toEqual(0);
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Fresh Hell!');
  });

  it('should not submit when form is invalid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    spyOn(localStorage, 'setItem');
    app.submitForm();
    expect(app.hells.length).toEqual(0);
  });

  it('should add a hell entry on valid submit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    spyOn(localStorage, 'setItem');
    app.formGroup.controls['hell'].setValue('Spilled coffee');
    app.submitForm();
    expect(app.hells.length).toEqual(1);
    expect(app.hells[0].description).toEqual('Spilled coffee');
    expect(app.stats.count).toEqual(1);
  });

  it('should reset the form after submission', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    spyOn(localStorage, 'setItem');
    app.formGroup.controls['hell'].setValue('Flat tire');
    app.submitForm();
    expect(app.formGroup.controls['hell'].value).toBeNull();
  });

  it('should display total hells count', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.stats-bar').textContent).toContain('0');
  });
});
