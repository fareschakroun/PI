import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineMeetingComponent } from './online-meeting.component';

describe('OnlineMeetingComponent', () => {
  let component: OnlineMeetingComponent;
  let fixture: ComponentFixture<OnlineMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
