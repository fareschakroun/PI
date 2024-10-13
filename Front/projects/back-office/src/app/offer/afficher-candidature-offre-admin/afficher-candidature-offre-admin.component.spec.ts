import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCandidatureOffreAdminComponent } from './afficher-candidature-offre-admin.component';

describe('AfficherCandidatureOffreAdminComponent', () => {
  let component: AfficherCandidatureOffreAdminComponent;
  let fixture: ComponentFixture<AfficherCandidatureOffreAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherCandidatureOffreAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherCandidatureOffreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
