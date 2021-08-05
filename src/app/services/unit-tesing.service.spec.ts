import { UnitTesingService } from './unit-tesing.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MyPost } from '../sharedData';
import { async, inject, TestBed } from '@angular/core/testing';

describe('UnitTesingService', () => {
  let service: UnitTesingService;
  let httpMock: HttpTestingController;
  let dummyposts: MyPost[];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnitTesingService],
    });
    service = TestBed.inject(UnitTesingService);
    httpMock = TestBed.inject(HttpTestingController);
    dummyposts = [
      {
        id: 1,
        title: 'testing',
        author: 'akshay',
      },
    ];
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get posts', () => {
    //arrange

    //act
    service.getPosts().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res).toEqual(dummyposts);
    });

    //assertion
    let req = httpMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyposts);
  });

  it('post operation', () => {
    //arrange

    //act
    service.post(dummyposts[0]).subscribe((res) => {
      expect(res[0].id).toBe(1);
      expect(res).toEqual(dummyposts);
    });

    //assertion
    let req = httpMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyposts);
  });
  it('put operation', () => {
    //arrange

    //act
    service.put(dummyposts[0]).subscribe((res) => {
      console.log(res);
      expect(res).toBeTruthy();
    });

    //assertion
    let req = httpMock.expectOne(service.baseUrl + '/' + dummyposts[0]['id']);
    console.log(req);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyposts);
  });
});
