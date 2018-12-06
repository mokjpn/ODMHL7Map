import { TestBed } from '@angular/core/testing';

import { MappingDataService } from './mapping-data.service';

describe('MappingDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MappingDataService = TestBed.get(MappingDataService);
    expect(service).toBeTruthy();
  });
});
