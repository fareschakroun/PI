import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroulsComponent } from './addrouls.component';

describe('AddroulsComponent', () => {
  let component: AddroulsComponent;
  let fixture: ComponentFixture<AddroulsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddroulsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddroulsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
