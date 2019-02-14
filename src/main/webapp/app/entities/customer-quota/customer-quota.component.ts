import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomerQuota } from 'app/shared/model/customer-quota.model';
import { AccountService } from 'app/core';
import { CustomerQuotaService } from './customer-quota.service';

@Component({
    selector: 'jhi-customer-quota',
    templateUrl: './customer-quota.component.html'
})
export class CustomerQuotaComponent implements OnInit, OnDestroy {
    customerQuotas: ICustomerQuota[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected customerQuotaService: CustomerQuotaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.customerQuotaService
            .query()
            .pipe(
                filter((res: HttpResponse<ICustomerQuota[]>) => res.ok),
                map((res: HttpResponse<ICustomerQuota[]>) => res.body)
            )
            .subscribe(
                (res: ICustomerQuota[]) => {
                    this.customerQuotas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerQuotas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICustomerQuota) {
        return item.id;
    }

    registerChangeInCustomerQuotas() {
        this.eventSubscriber = this.eventManager.subscribe('customerQuotaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
