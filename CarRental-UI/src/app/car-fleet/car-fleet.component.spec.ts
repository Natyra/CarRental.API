/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarFleetComponent } from './car-fleet.component';

describe('CarFleetComponent', () => {
  let component: CarFleetComponent;
  let fixture: ComponentFixture<CarFleetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarFleetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
