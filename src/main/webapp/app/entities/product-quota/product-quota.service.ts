import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductQuota } from 'app/shared/model/product-quota.model';

type EntityResponseType = HttpResponse<IProductQuota>;
type EntityArrayResponseType = HttpResponse<IProductQuota[]>;

@Injectable({ providedIn: 'root' })
export class ProductQuotaService {
    public resourceUrl = SERVER_API_URL + 'api/product-quotas';

    constructor(protected http: HttpClient) {}

    create(productQuota: IProductQuota): Observable<EntityResponseType> {
        return this.http.post<IProductQuota>(this.resourceUrl, productQuota, { observe: 'response' });
    }

    update(productQuota: IProductQuota): Observable<EntityResponseType> {
        return this.http.put<IProductQuota>(this.resourceUrl, productQuota, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductQuota>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductQuota[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
