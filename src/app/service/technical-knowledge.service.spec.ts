import { TestBed } from '@angular/core/testing';

import { TechnicalKnowledgeService } from './technical-knowledge.service';

describe('TechnicalKnowledgeService', () => {
  let service: TechnicalKnowledgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalKnowledgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
