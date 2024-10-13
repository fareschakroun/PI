import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSupplierAdminComponent } from './chat-supplier-admin.component';

describe('ChatSupplierAdminComponent', () => {
  let component: ChatSupplierAdminComponent;
  let fixture: ComponentFixture<ChatSupplierAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSupplierAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSupplierAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
