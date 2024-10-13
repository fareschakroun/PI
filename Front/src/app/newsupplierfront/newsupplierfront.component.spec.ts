import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsupplierfrontComponent } from './newsupplierfront.component';

describe('NewsupplierfrontComponent', () => {
  let component: NewsupplierfrontComponent;
  let fixture: ComponentFixture<NewsupplierfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsupplierfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsupplierfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
