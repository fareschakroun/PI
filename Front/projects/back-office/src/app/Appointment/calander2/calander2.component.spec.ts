import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calander2Component } from './calander2.component';

describe('Calander2Component', () => {
  let component: Calander2Component;
  let fixture: ComponentFixture<Calander2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calander2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calander2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
