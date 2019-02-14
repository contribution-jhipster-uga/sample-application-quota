import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CategoryQuota } from 'app/shared/model/category-quota.model';
import { CategoryQuotaService } from './category-quota.service';
import { CategoryQuotaComponent } from './category-quota.component';
import { CategoryQuotaDetailComponent } from './category-quota-detail.component';
import { CategoryQuotaUpdateComponent } from './category-quota-update.component';
import { CategoryQuotaDeletePopupComponent } from './category-quota-delete-dialog.component';
import { ICategoryQuota } from 'app/shared/model/category-quota.model';

@Injectable({ providedIn: 'root' })
export class CategoryQuotaResolve implements Resolve<ICategoryQuota> {
    constructor(private service: CategoryQuotaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoryQuota> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CategoryQuota>) => response.ok),
                map((categoryQuota: HttpResponse<CategoryQuota>) => categoryQuota.body)
            );
        }
        return of(new CategoryQuota());
    }
}

export const categoryQuotaRoute: Routes = [
    {
        path: '',
        component: CategoryQuotaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.categoryQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CategoryQuotaDetailComponent,
        resolve: {
            categoryQuota: CategoryQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.categoryQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CategoryQuotaUpdateComponent,
        resolve: {
            categoryQuota: CategoryQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.categoryQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CategoryQuotaUpdateComponent,
        resolve: {
            categoryQuota: CategoryQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.categoryQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryQuotaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CategoryQuotaDeletePopupComponent,
        resolve: {
            categoryQuota: CategoryQuotaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.categoryQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
