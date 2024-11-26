import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '@services/dashboard.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  beforeEach(() => {
    dashboardService = jasmine.createSpyObj('DashboardService', ['getDashboard', 'getDashboardDate']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: dashboardService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDataDashboard on initialization', () => {
    const dashboardData = { totals: { layers: 10, schedules: 20, wfs: 30 }, payload: [] };
    dashboardService.getDashboard.and.returnValue(of(dashboardData));
    component.ngOnInit();
    expect(dashboardService.getDashboard).toHaveBeenCalled();
  });

  it('should call change_chart1 with option 1 when filtering is off', () => {
    const dashboardData = { totals: { layers: 10, schedules: 20, wfs: 30 }, payload: [] };
    dashboardService.getDashboard.and.returnValue(of(dashboardData));
    component.change_chart(1);
    expect(dashboardService.getDashboard).toHaveBeenCalled();
  });

  // Add more test cases as needed for other methods and behavior

});
