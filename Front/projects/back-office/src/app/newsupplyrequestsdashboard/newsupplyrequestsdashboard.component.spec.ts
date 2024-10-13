import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsupplyrequestsdashboardComponent } from './newsupplyrequestsdashboard.component';

describe('NewsupplyrequestsdashboardComponent', () => {
  let component: NewsupplyrequestsdashboardComponent;
  let fixture: ComponentFixture<NewsupplyrequestsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsupplyrequestsdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsupplyrequestsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
