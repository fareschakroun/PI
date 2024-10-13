import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackSalesPerYearComponent } from './pack-sales-per-year.component';

describe('PackSalesPerYearComponent', () => {
  let component: PackSalesPerYearComponent;
  let fixture: ComponentFixture<PackSalesPerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackSalesPerYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackSalesPerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
