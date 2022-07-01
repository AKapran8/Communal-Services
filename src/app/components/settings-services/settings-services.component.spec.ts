import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsServicesComponent } from './settings-services.component';

describe('SettingsServicesComponent', () => {
  let component: SettingsServicesComponent;
  let fixture: ComponentFixture<SettingsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
