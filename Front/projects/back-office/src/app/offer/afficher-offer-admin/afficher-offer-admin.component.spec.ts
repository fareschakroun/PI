import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherOfferAdminComponent } from './afficher-offer-admin.component';

describe('AfficherOfferAdminComponent', () => {
  let component: AfficherOfferAdminComponent;
  let fixture: ComponentFixture<AfficherOfferAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherOfferAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherOfferAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
