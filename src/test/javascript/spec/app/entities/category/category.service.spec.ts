/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CategoryService } from 'app/entities/category/category.service';
import { ICategory, Category, CategoryStatus } from 'app/shared/model/category.model';

describe('Service Tests', () => {
    describe('Category Service', () => {
        let injector: TestBed;
        let service: CategoryService;
        let httpMock: HttpTestingController;
        let elemDefault: ICategory;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(CategoryService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Category(0, 'AAAAAAA', 0, currentDate, currentDate, CategoryStatus.AVAILABLE);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateAdded: currentDate.format(DATE_FORMAT),
                        dateModified: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Category', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateAdded: currentDate.format(DATE_FORMAT),
                        dateModified: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateAdded: currentDate,
                        dateModified: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Category(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Category', async () => {
                const returnedFromService = Object.assign(
                    {
                        description: 'BBBBBB',
                        sortOrder: 1,
                        dateAdded: currentDate.format(DATE_FORMAT),
                        dateModified: currentDate.format(DATE_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateAdded: currentDate,
                        dateModified: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Category', async () => {
                const returnedFromService = Object.assign(
                    {
                        description: 'BBBBBB',
                        sortOrder: 1,
                        dateAdded: currentDate.format(DATE_FORMAT),
                        dateModified: currentDate.format(DATE_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateAdded: currentDate,
                        dateModified: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Category', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
