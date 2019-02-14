import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductQuota } from 'app/shared/model/product-quota.model';
import { ProductQuotaService } from './product-quota.service';
import { ProductQuotaComponent } from './product-quota.component';
import { ProductQuotaDetailComponent } from './product-quota-detail.component';
import { ProductQuotaUpdateComponent } from './product-quota-update.component';
import { ProductQuotaDeletePopupComponent } from './product-quota-delete-dialog.component';
import { IProductQuota } from 'app/shared/model/product-quota.model';

@Injectable({ providedIn: 'root' })
export class ProductQuotaResolve implements Resolve<IProductQuota> {
    constructor(private service: ProductQuotaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductQuota> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductQuota>) => response.ok),
                map((productQuota: HttpResponse<ProductQuota>) => productQuota.body)
            );
        }
        return of(new ProductQuota());
    }
}

export const productQuotaRoute: Routes = [
    {
        path: '',
        component: ProductQuotaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.productQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductQuotaDetailComponent,
        resolve: {
            productQuota: ProductQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.productQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductQuotaUpdateComponent,
        resolve: {
            productQuota: ProductQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.productQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductQuotaUpdateComponent,
        resolve: {
            productQuota: ProductQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.productQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productQuotaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductQuotaDeletePopupComponent,
        resolve: {
            productQuota: ProductQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.productQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
