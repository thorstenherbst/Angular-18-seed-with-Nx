import { ApiService } from '@frontend/api';
import { Injector } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;
  let httpClient: HttpClient;
  let injector: Injector;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
      http = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);

    service = TestBed.inject(ApiService);
  });

  it('should return items', waitForAsync( () => {
    service.getAll().subscribe();
    const req = http.expectOne('/people');
    req.flush({results: [
        {
          "uid": "1",
          "name": "Luke Skywalker",
          "url": "https://www.swapi.tech/api/people/1"
        }
      ]})
    expect(service.items()[0].name).toBe('Luke Skywalker');
  }));
});
