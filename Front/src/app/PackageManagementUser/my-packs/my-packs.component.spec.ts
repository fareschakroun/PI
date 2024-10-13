import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPacksComponent } from './my-packs.component';

describe('MyPacksComponent', () => {
  let component: MyPacksComponent;
  let fixture: ComponentFixture<MyPacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
