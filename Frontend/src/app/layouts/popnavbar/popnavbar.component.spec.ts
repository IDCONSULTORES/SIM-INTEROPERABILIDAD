import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopnavbarComponent } from './popnavbar.component';

describe('PopnavbarComponent', () => {
  let component: PopnavbarComponent;
  let fixture: ComponentFixture<PopnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopnavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
