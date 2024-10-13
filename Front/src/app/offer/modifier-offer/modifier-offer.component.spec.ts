import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOfferComponent } from './modifier-offer.component';

describe('ModifierOfferComponent', () => {
  let component: ModifierOfferComponent;
  let fixture: ComponentFixture<ModifierOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
