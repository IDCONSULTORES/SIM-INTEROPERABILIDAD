import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingsService } from './settings.service';
import { environment } from 'src/environments/environment';

fdescribe('SettingsService', () => {
  let settingsService: SettingsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsService],
    });

    settingsService = TestBed.inject(SettingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(settingsService).toBeTruthy();
  });

  it('should post settings', () => {
    const mockSettings = { key: 'someKey', value: 'someValue' };
    const mockResponse = { success: true };

    settingsService.postSettings(mockSettings).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.etl}/db`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockSettings);
    req.flush(mockResponse);
  });

  it('should get settings', () => {
    const mockResponse = { key: 'someKey', value: 'someValue' };

    settingsService.getSettings().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.etl}/db`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
