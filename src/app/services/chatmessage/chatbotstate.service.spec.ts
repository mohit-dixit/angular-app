import { TestBed } from '@angular/core/testing';

import { ChatbotstateService } from './chatbotstate.service';

describe('ChatbotstateService', () => {
  let service: ChatbotstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
