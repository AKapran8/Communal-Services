import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStepRigester } from './register.component';

describe('RegisterComponent', () => {
  let component: FirstStepRigester;
  let fixture: ComponentFixture<FirstStepRigester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstStepRigester ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStepRigester);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
