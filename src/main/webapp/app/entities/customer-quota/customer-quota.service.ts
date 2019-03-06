import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerQuota } from 'app/shared/model/customer-quota.model';

type EntityResponseType = HttpResponse<ICustomerQuota>;
type EntityArrayResponseType = HttpResponse<ICustomerQuota[]>;

@Injectable({ providedIn: 'root' })
export class CustomerQuotaService {
    public resourceUrl = SERVER_API_URL + 'api/customer-quotas';

    constructor(protected http: HttpClient) {}

    create(customerQuota: ICustomerQuota): Observable<EntityResponseType> {
        return this.http.post<ICustomerQuota>(this.resourceUrl, customerQuota, { observe: 'response' });
    }

    update(customerQuota: ICustomerQuota): Observable<EntityResponseType> {
        return this.http.put<ICustomerQuota>(this.resourceUrl, customerQuota, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICustomerQuota>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICustomerQuota[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
