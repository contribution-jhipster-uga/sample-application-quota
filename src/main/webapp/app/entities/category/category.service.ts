import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategory } from 'app/shared/model/category.model';

type EntityResponseType = HttpResponse<ICategory>;
type EntityArrayResponseType = HttpResponse<ICategory[]>;

@Injectable({ providedIn: 'root' })
export class CategoryService {
    public resourceUrl = SERVER_API_URL + 'api/categories';

    constructor(protected http: HttpClient) {}

    create(category: ICategory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(category);
        return this.http
            .post<ICategory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(category: ICategory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(category);
        return this.http
            .put<ICategory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICategory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICategory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(category: ICategory): ICategory {
        const copy: ICategory = Object.assign({}, category, {
            dateAdded: category.dateAdded != null && category.dateAdded.isValid() ? category.dateAdded.format(DATE_FORMAT) : null,
            dateModified:
                category.dateModified != null && category.dateModified.isValid() ? category.dateModified.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateAdded = res.body.dateAdded != null ? moment(res.body.dateAdded) : null;
            res.body.dateModified = res.body.dateModified != null ? moment(res.body.dateModified) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((category: ICategory) => {
                category.dateAdded = category.dateAdded != null ? moment(category.dateAdded) : null;
                category.dateModified = category.dateModified != null ? moment(category.dateModified) : null;
            });
        }
        return res;
    }
}
