import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomerQuota } from 'app/shared/model/customer-quota.model';
import { CustomerQuotaService } from './customer-quota.service';
import { CustomerQuotaComponent } from './customer-quota.component';
import { CustomerQuotaDetailComponent } from './customer-quota-detail.component';
import { CustomerQuotaUpdateComponent } from './customer-quota-update.component';
import { CustomerQuotaDeletePopupComponent } from './customer-quota-delete-dialog.component';
import { ICustomerQuota } from 'app/shared/model/customer-quota.model';

@Injectable({ providedIn: 'root' })
export class CustomerQuotaResolve implements Resolve<ICustomerQuota> {
    constructor(private service: CustomerQuotaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomerQuota> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CustomerQuota>) => response.ok),
                map((customerQuota: HttpResponse<CustomerQuota>) => customerQuota.body)
            );
        }
        return of(new CustomerQuota());
    }
}

export const customerQuotaRoute: Routes = [
    {
        path: '',
        component: CustomerQuotaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customerQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CustomerQuotaDetailComponent,
        resolve: {
            customerQuota: CustomerQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customerQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CustomerQuotaUpdateComponent,
        resolve: {
            customerQuota: CustomerQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customerQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CustomerQuotaUpdateComponent,
        resolve: {
            customerQuota: CustomerQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customerQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerQuotaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CustomerQuotaDeletePopupComponent,
        resolve: {
            customerQuota: CustomerQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.customerQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
