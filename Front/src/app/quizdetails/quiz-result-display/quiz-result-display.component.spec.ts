import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultDisplayComponent } from './quiz-result-display.component';

describe('QuizResultDisplayComponent', () => {
  let component: QuizResultDisplayComponent;
  let fixture: ComponentFixture<QuizResultDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizResultDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizResultDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
