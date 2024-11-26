import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPieComponentComponent } from './basic-pie-component.component';

describe('BasicPieComponentComponent', () => {
  let component: BasicPieComponentComponent;
  let fixture: ComponentFixture<BasicPieComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPieComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPieComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
