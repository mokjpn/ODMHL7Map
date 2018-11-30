import { TestBed } from '@angular/core/testing';

import { OdmelementsService } from './odmelements.service';

describe('OdmelementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OdmelementsService = TestBed.get(OdmelementsService);
    expect(service).toBeTruthy();
  });
});
