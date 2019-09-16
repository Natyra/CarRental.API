/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarmodelService } from './carmodel.service';

describe('Service: Carmodel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarmodelService]
    });
  });

  it('should ...', inject([CarmodelService], (service: CarmodelService) => {
    expect(service).toBeTruthy();
  }));
});
