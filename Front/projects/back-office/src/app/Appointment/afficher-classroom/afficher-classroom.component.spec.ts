import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherClassroomComponent } from './afficher-classroom.component';

describe('AfficherClassroomComponent', () => {
  let component: AfficherClassroomComponent;
  let fixture: ComponentFixture<AfficherClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
