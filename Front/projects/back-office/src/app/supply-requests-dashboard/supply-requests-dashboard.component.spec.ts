import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestsDashboardComponent } from './supply-requests-dashboard.component';

describe('SupplyRequestsDashboardComponent', () => {
  let component: SupplyRequestsDashboardComponent;
  let fixture: ComponentFixture<SupplyRequestsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyRequestsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyRequestsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
