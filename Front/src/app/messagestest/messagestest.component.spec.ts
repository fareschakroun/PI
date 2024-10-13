import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagestestComponent } from './messagestest.component';

describe('MessagestestComponent', () => {
  let component: MessagestestComponent;
  let fixture: ComponentFixture<MessagestestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagestestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagestestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
