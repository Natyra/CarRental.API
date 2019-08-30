/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FueltypesListComponent } from './fueltypes-list.component';

describe('FueltypesListComponent', () => {
  let component: FueltypesListComponent;
  let fixture: ComponentFixture<FueltypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FueltypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FueltypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
