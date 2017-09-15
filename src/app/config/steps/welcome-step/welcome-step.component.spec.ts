import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeStepComponent } from './welcome-step.component';

describe('WelcomeStepComponent', () => {
  let component: WelcomeStepComponent;
  let fixture: ComponentFixture<WelcomeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
