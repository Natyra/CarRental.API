/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FueltypesAddComponent } from './fueltypes-add.component';

describe('FueltypesAddComponent', () => {
  let component: FueltypesAddComponent;
  let fixture: ComponentFixture<FueltypesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FueltypesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FueltypesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
