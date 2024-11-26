import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { environment } from '@environments/environment';

fdescribe('DashboardService', () => {
  let service: DashboardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });
    service = TestBed.inject(DashboardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getDashboard and return data', () => {
    const mockData = { totals: { layers: 10, schedules: 20, wfs: 30 }, payload: [] };

    service.getDashboard().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${environment.etl}/dashboard/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call getDashboardDate with start and end dates and return data', () => {
    const start = '2023-01-01';
    const end = '2023-01-31';
    const mockData = { totals: { layers: 5, schedules: 15, wfs: 25 }, payload: [] };

    service.getDashboardDate(start, end).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${environment.etl}/dashboard/from/${start}/to/${end}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
