import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAttributesComponent } from './schedule-attributes.component';

describe('ScheduleAttributesComponent', () => {
  let component: ScheduleAttributesComponent;
  let fixture: ComponentFixture<ScheduleAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
