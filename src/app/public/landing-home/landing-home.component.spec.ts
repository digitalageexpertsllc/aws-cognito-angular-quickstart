import { Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHomeComponent } from './landing-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserLoginService } from '../services/user-login.service';

export class MockUserLoginService {
  authenticated = true;

  isAuthenticatedObservable(): Observable<boolean> {
    return of(this.authenticated);
  }
}

describe('LandingHomeComponent - Not Logged In', () => {
  let component: LandingHomeComponent;
  let fixture: ComponentFixture<LandingHomeComponent>;
  let service: MockUserLoginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingHomeComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UserLoginService, useClass: MockUserLoginService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(UserLoginService);
    service.authenticated = false;
    fixture = TestBed.createComponent(LandingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
  });

  it('should create and stay if not logged in', () => {
    service.authenticated = false;
    expect(component).toBeTruthy();
  });
});

describe('LandingHomeComponent - Logged In', () => {
  let component: LandingHomeComponent;
  let fixture: ComponentFixture<LandingHomeComponent>;
  let service: MockUserLoginService;
  let navigateSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingHomeComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UserLoginService, useClass: MockUserLoginService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(UserLoginService);
    service.authenticated = true;
    fixture = TestBed.createComponent(LandingHomeComponent);
    component = fixture.componentInstance;
    navigateSpy = spyOn((<any>component).router, 'navigate').and.returnValue(true);
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
  });

  it('should redirect to the projects page if the user is already logged in', () => {
    service.authenticated = true;

    expect(navigateSpy).toHaveBeenCalledWith(['projects']);
  });
});
