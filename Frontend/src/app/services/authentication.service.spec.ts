import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

fdescribe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });

    authService = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login user', () => {
    const userData = {
      username: 'testUser',
      password: 'testPassword',
    };
    const mockResponse = {
      payload: {
        access_token: 'mockAccessToken',
        refresh_token: 'mockRefreshToken',
      },
    };

    authService.login(userData).subscribe((user) => {
      expect(user).toEqual(mockResponse.payload);
    });

    const req = httpTestingController.expectOne(`${environment.auth}/users/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });




  it('should refresh the token', () => {
    const mockResponse = {
      payload: 'newAccessToken',
    };

    authService.refreshToken().subscribe((token) => {
      expect(token).toEqual(mockResponse.payload);
    });

    const req = httpTestingController.expectOne(`${environment.auth}/users/refresh`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should verify user', () => {
    const mockData = { token: 'mockToken' };
    authService.verify(mockData).subscribe((response) => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(`${environment.auth}/users/verify`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // You can customize the response as needed
  });
});
