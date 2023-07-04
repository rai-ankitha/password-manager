import { TestBed } from '@angular/core/testing';

import { AddSiteDetailsService } from './add-site-details.service';

describe('AddSiteDetailsService', () => {
  let service: AddSiteDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSiteDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
