/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FueltypeService } from './fueltype.service';

describe('Service: Fueltype', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FueltypeService]
    });
  });

  it('should ...', inject([FueltypeService], (service: FueltypeService) => {
    expect(service).toBeTruthy();
  }));
});
