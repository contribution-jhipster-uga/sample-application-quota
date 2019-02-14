import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddressQuota } from 'app/shared/model/address-quota.model';

type EntityResponseType = HttpResponse<IAddressQuota>;
type EntityArrayResponseType = HttpResponse<IAddressQuota[]>;

@Injectable({ providedIn: 'root' })
export class AddressQuotaService {
    public resourceUrl = SERVER_API_URL + 'api/address-quotas';

    constructor(protected http: HttpClient) {}

    create(addressQuota: IAddressQuota): Observable<EntityResponseType> {
        return this.http.post<IAddressQuota>(this.resourceUrl, addressQuota, { observe: 'response' });
    }

    update(addressQuota: IAddressQuota): Observable<EntityResponseType> {
        return this.http.put<IAddressQuota>(this.resourceUrl, addressQuota, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAddressQuota>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddressQuota[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
