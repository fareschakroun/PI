import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothplacementComponent } from './boothplacement.component';

describe('BoothplacementComponent', () => {
  let component: BoothplacementComponent;
  let fixture: ComponentFixture<BoothplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothplacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoothplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
