import { ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceOfferTableComponent } from './service-offer-table.component';
import { of, throwError } from 'rxjs';
import { WfsService } from '@services/wfs.service';
import { ConvertService } from '@services/convert.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceOfferTableComponent', () => {
  let component: ServiceOfferTableComponent;
  let fixture: ComponentFixture<ServiceOfferTableComponent>;
  let matDialog: MatDialog;

  beforeEach(() => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ServiceOfferTableComponent],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        // Provide other dependencies as needed
      ],
    });
    fixture = TestBed.createComponent(ServiceOfferTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should load data on ngOnInit', () => {
    const wfsService = TestBed.inject(WfsService);
    spyOn(wfsService, 'getWFS').and.returnValue(of({ payload: { wfs: [{ source: 'MIDAGRI', isAvailable: 'Disponible' }] } }));
    component.ngOnInit();
    expect(wfsService.getWFS).toHaveBeenCalled();
   
  });






  it('should download file (WFS)', fakeAsync(() => {
    const element = { id: 1, name: 'Layer1', service: 'WFS', url: 'http://167.114.174.169:8090/etl/api/wfs/files/Layer1', createBy: 'user' };
    const convertService = TestBed.inject(ConvertService);
    const httpClient = TestBed.inject(HttpClient);
    
    // Simula la respuesta del servicio de conversión
    spyOn(convertService, 'postConversion').and.returnValue(of({}));
    
    // Crea un objeto Blob para simular la respuesta del servidor
    const blob = new Blob([], { type: 'application/octet-stream' });
    
    // Simula la respuesta del servicio HTTP
    spyOn(httpClient, 'get').and.returnValue(of(blob));
    
    spyOn(component.toastService, 'showInfoToast');
    
    component.download(element);
    
    flush(); // Asegura que las operaciones asíncronas se completen
    
    expect(convertService.postConversion).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('http://167.114.174.169:8090/etl/api/wfs/files/Layer1', Object({ responseType: 'blob' }));
    expect(component.toastService.showInfoToast).toHaveBeenCalledWith('Se descargó correctamente');
  }));
  


it('should download file (WMS)', fakeAsync(() => {
     const element = { id: 1, name: 'Layer1', service: 'WMS', url: 'http://167.114.174.169:8090/etl/api/wms/1', createBy: 'user' };
    const convertService = TestBed.inject(ConvertService);
    const httpClient = TestBed.inject(HttpClient);
    
    // Simula la respuesta del servicio de conversión
    spyOn(convertService, 'postConversion').and.returnValue(of({}));
    
    // Crea un objeto Blob para simular la respuesta del servidor
    const blob = new Blob([], { type: 'application/octet-stream' });
    
    // Simula la respuesta del servicio HTTP
    spyOn(httpClient, 'get').and.returnValue(of(blob));
    
    spyOn(component.toastService, 'showInfoToast');
    
    component.download(element);
    
    flush(); // Asegura que las operaciones asíncronas se completen
    
    expect(httpClient.get).toHaveBeenCalledWith('http://167.114.174.169:8090/etl/api/wms/1', Object({ responseType: 'blob' }));
    expect(component.toastService.showInfoToast).toHaveBeenCalledWith('Se descargó correctamente');
}));


});
