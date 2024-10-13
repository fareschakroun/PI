import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizinterfaceComponent } from './quizinterface.component';

describe('QuizinterfaceComponent', () => {
  let component: QuizinterfaceComponent;
  let fixture: ComponentFixture<QuizinterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizinterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
