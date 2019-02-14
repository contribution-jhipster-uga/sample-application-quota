import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductQuota } from 'app/shared/model/product-quota.model';
import { AccountService } from 'app/core';
import { ProductQuotaService } from './product-quota.service';

@Component({
    selector: 'jhi-product-quota',
    templateUrl: './product-quota.component.html'
})
export class ProductQuotaComponent implements OnInit, OnDestroy {
    productQuotas: IProductQuota[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected productQuotaService: ProductQuotaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.productQuotaService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductQuota[]>) => res.ok),
                map((res: HttpResponse<IProductQuota[]>) => res.body)
            )
            .subscribe(
                (res: IProductQuota[]) => {
                    this.productQuotas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductQuotas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductQuota) {
        return item.id;
    }

    registerChangeInProductQuotas() {
        this.eventSubscriber = this.eventManager.subscribe('productQuotaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
