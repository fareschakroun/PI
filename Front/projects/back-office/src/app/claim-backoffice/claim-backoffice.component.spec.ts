import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimBackofficeComponent } from './claim-backoffice.component';

describe('ClaimBackofficeComponent', () => {
  let component: ClaimBackofficeComponent;
  let fixture: ComponentFixture<ClaimBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimBackofficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
