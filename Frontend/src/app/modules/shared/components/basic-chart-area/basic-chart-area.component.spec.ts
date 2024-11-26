import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChartAreaComponent } from './basic-chart-area.component';

describe('BasicChartAreaComponent', () => {
  let component: BasicChartAreaComponent;
  let fixture: ComponentFixture<BasicChartAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicChartAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicChartAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
