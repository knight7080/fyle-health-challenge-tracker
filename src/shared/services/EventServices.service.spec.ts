import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { EventServices } from './EventServices';

describe('EventServices', () => {
  let service: EventServices;
  let mockSubject: Subject<any>;

  beforeEach(() => {
    // Create a mock subject
    mockSubject = new Subject<any>();

    // Override the service's subject with the mock
    TestBed.configureTestingModule({
      providers: [
        EventServices,
        { provide: Subject, useValue: mockSubject }
      ]
    });

    service = TestBed.inject(EventServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
});
