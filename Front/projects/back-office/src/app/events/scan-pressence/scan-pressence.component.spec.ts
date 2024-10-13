import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPressenceComponent } from './scan-pressence.component';

describe('ScanPressenceComponent', () => {
  let component: ScanPressenceComponent;
  let fixture: ComponentFixture<ScanPressenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanPressenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanPressenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
