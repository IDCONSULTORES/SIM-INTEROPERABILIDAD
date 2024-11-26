import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDemandComponent } from './service-demand.component';

describe('ServiceDemandComponent', () => {
  let component: ServiceDemandComponent;
  let fixture: ComponentFixture<ServiceDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
