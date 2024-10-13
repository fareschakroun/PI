import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCandidatursUserComponent } from './afficher-candidaturs-user.component';

describe('AfficherCandidatursUserComponent', () => {
  let component: AfficherCandidatursUserComponent;
  let fixture: ComponentFixture<AfficherCandidatursUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherCandidatursUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherCandidatursUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
