import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePacksComponent } from './historique-packs.component';

describe('HistoriquePacksComponent', () => {
  let component: HistoriquePacksComponent;
  let fixture: ComponentFixture<HistoriquePacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquePacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquePacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
