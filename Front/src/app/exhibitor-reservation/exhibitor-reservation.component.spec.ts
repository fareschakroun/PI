import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorReservationComponent } from './exhibitor-reservation.component';

describe('ExhibitorReservationComponent', () => {
  let component: ExhibitorReservationComponent;
  let fixture: ComponentFixture<ExhibitorReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitorReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitorReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
