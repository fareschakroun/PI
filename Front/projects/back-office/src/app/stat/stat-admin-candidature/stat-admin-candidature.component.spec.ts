import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatAdminCandidatureComponent } from './stat-admin-candidature.component';

describe('StatAdminCandidatureComponent', () => {
  let component: StatAdminCandidatureComponent;
  let fixture: ComponentFixture<StatAdminCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatAdminCandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatAdminCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
