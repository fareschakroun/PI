import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralquizinterfaceComponent } from './generalquizinterface.component';

describe('GeneralquizinterfaceComponent', () => {
  let component: GeneralquizinterfaceComponent;
  let fixture: ComponentFixture<GeneralquizinterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralquizinterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralquizinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
