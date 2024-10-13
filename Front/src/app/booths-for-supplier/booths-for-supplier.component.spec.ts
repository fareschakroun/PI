import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothsForSupplierComponent } from './booths-for-supplier.component';

describe('BoothsForSupplierComponent', () => {
  let component: BoothsForSupplierComponent;
  let fixture: ComponentFixture<BoothsForSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothsForSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoothsForSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
