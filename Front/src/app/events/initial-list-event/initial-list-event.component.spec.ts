import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialListEventComponent } from './initial-list-event.component';

describe('InitialListEventComponent', () => {
  let component: InitialListEventComponent;
  let fixture: ComponentFixture<InitialListEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialListEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
