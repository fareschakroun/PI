import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherOffreComponent } from './afficher-offre.component';

describe('AfficherOffreComponent', () => {
  let component: AfficherOffreComponent;
  let fixture: ComponentFixture<AfficherOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
