import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationinterfaceComponent } from './authenticationinterface.component';

describe('AuthenticationinterfaceComponent', () => {
  let component: AuthenticationinterfaceComponent;
  let fixture: ComponentFixture<AuthenticationinterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationinterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
