/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarResultComponent } from './car-result.component';

describe('CarResultComponent', () => {
  let component: CarResultComponent;
  let fixture: ComponentFixture<CarResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
