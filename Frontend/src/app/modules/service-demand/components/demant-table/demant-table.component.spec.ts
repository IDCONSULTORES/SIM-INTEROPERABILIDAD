import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemantTableComponent } from './demant-table.component';

describe('DemantTableComponent', () => {
  let component: DemantTableComponent;
  let fixture: ComponentFixture<DemantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemantTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
