import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePermissionsComponent } from './modal-delete-permissions.component';

describe('ModalDeletePermissionsComponent', () => {
  let component: ModalDeletePermissionsComponent;
  let fixture: ComponentFixture<ModalDeletePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeletePermissionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeletePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
