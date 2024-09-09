import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClasesService } from './clases.service';

describe('ClasesService', () => {
  let service: ClasesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClasesService],
    });
    service = TestBed.inject(ClasesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch classes', () => {
    const mockClasses = [
      { id: 1, name: 'Math' },
      { id: 2, name: 'Science' },
    ];

    service.getClasses().subscribe((classes) => {
      expect(classes.length).toBe(2);
      expect(classes).toEqual(mockClasses);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/classes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClasses); // Simula la respuesta de la API con clases simuladas
  });
});
