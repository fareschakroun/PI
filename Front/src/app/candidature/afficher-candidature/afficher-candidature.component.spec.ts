import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCandidatureComponent } from './afficher-candidature.component';

describe('AfficherCandidatureComponent', () => {
  let component: AfficherCandidatureComponent;
  let fixture: ComponentFixture<AfficherCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherCandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
