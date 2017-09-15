import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesStepComponent } from './services-step.component';

describe('ServicesStepComponent', () => {
  let component: ServicesStepComponent;
  let fixture: ComponentFixture<ServicesStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
