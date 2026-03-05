import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFooterComponent } from './angular-footer.component';

describe('AngularFooterComponent', () => {
  let component: AngularFooterComponent;
  let fixture: ComponentFixture<AngularFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFooterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
