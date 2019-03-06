import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategoryQuota } from 'app/shared/model/category-quota.model';

type EntityResponseType = HttpResponse<ICategoryQuota>;
type EntityArrayResponseType = HttpResponse<ICategoryQuota[]>;

@Injectable({ providedIn: 'root' })
export class CategoryQuotaService {
    public resourceUrl = SERVER_API_URL + 'api/category-quotas';

    constructor(protected http: HttpClient) {}

    create(categoryQuota: ICategoryQuota): Observable<EntityResponseType> {
        return this.http.post<ICategoryQuota>(this.resourceUrl, categoryQuota, { observe: 'response' });
    }

    update(categoryQuota: ICategoryQuota): Observable<EntityResponseType> {
        return this.http.put<ICategoryQuota>(this.resourceUrl, categoryQuota, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICategoryQuota>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICategoryQuota[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
