import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScheduleService } from './schedule.service';

fdescribe('ScheduleService', () => {
  let service: ScheduleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScheduleService],
    });
    service = TestBed.inject(ScheduleService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
