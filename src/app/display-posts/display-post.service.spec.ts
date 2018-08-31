import { TestBed, inject } from '@angular/core/testing';

import { DisplayPostService } from './display-post.service';

describe('DisplayPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayPostService]
    });
  });

  it('should be created', inject([DisplayPostService], (service: DisplayPostService) => {
    expect(service).toBeTruthy();
  }));
});
