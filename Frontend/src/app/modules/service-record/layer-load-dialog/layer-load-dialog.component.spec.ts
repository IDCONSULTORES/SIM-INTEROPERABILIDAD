import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerLoadDialogComponent } from './layer-load-dialog.component';

describe('LayerLoadDialogComponent', () => {
  let component: LayerLoadDialogComponent;
  let fixture: ComponentFixture<LayerLoadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerLoadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerLoadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
