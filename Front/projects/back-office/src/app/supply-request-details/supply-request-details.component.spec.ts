import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestDetailsComponent } from './supply-request-details.component';

describe('SupplyRequestDetailsComponent', () => {
  let component: SupplyRequestDetailsComponent;
  let fixture: ComponentFixture<SupplyRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
