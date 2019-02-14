import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AddressQuota } from 'app/shared/model/address-quota.model';
import { AddressQuotaService } from './address-quota.service';
import { AddressQuotaComponent } from './address-quota.component';
import { AddressQuotaDetailComponent } from './address-quota-detail.component';
import { AddressQuotaUpdateComponent } from './address-quota-update.component';
import { AddressQuotaDeletePopupComponent } from './address-quota-delete-dialog.component';
import { IAddressQuota } from 'app/shared/model/address-quota.model';

@Injectable({ providedIn: 'root' })
export class AddressQuotaResolve implements Resolve<IAddressQuota> {
    constructor(private service: AddressQuotaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAddressQuota> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AddressQuota>) => response.ok),
                map((addressQuota: HttpResponse<AddressQuota>) => addressQuota.body)
            );
        }
        return of(new AddressQuota());
    }
}

export const addressQuotaRoute: Routes = [
    {
        path: '',
        component: AddressQuotaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.addressQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AddressQuotaDetailComponent,
        resolve: {
            addressQuota: AddressQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.addressQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AddressQuotaUpdateComponent,
        resolve: {
            addressQuota: AddressQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.addressQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AddressQuotaUpdateComponent,
        resolve: {
            addressQuota: AddressQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.addressQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressQuotaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AddressQuotaDeletePopupComponent,
        resolve: {
            addressQuota: AddressQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.addressQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
