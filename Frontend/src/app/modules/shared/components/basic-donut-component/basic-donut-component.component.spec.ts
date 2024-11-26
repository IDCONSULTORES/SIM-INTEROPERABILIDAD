import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDonutComponentComponent } from './basic-donut-component.component';

describe('BasicDonutComponentComponent', () => {
  let component: BasicDonutComponentComponent;
  let fixture: ComponentFixture<BasicDonutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDonutComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDonutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
