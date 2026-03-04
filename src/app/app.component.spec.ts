import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// TODO [HIGH] Missing ReactiveFormsModule: TestBed does not import ReactiveFormsModule, so any test
//   that compiles the template (detectChanges) will throw "Can't bind to 'formGroup' since it isn't
//   a known property". Add ReactiveFormsModule (and AngularFooterComponent or NO_ERRORS_SCHEMA) to
//   the testing module imports.

// TODO [MEDIUM] localStorage not mocked: AppComponent reads localStorage in its constructor, so
//   every test runs against real browser storage. Tests may pass or fail depending on pre-existing
//   stored data and will pollute storage for subsequent tests. Provide a mock:
//     beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue(null));
//   or wrap localStorage in an injectable service and provide a spy/stub in tests.

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // TODO [HIGH] Failing test — property does not exist: `AppComponent` has no `title` property.
  //   This test will always fail. Either add a `title = 'FreshHell'` property to the component
  //   or delete this test and replace it with a meaningful assertion about actual component state
  //   (e.g. initial `hells` array is empty, initial `stats.count` is 0).
  it(`should have as title 'FreshHell'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('FreshHell');
  });

  // TODO [HIGH] Failing test — wrong expected text: the h1 in the template contains "FreshHell!"
  //   not "Welcome to FreshHell!". Update the assertion to match the actual rendered text, or better,
  //   drive the h1 text from a component property so the test and the template stay in sync.
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to FreshHell!');
  });
});
