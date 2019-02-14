import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAddressQuota } from 'app/shared/model/address-quota.model';
import { AccountService } from 'app/core';
import { AddressQuotaService } from './address-quota.service';

@Component({
    selector: 'jhi-address-quota',
    templateUrl: './address-quota.component.html'
})
export class AddressQuotaComponent implements OnInit, OnDestroy {
    addressQuotas: IAddressQuota[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected addressQuotaService: AddressQuotaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.addressQuotaService
            .query()
            .pipe(
                filter((res: HttpResponse<IAddressQuota[]>) => res.ok),
                map((res: HttpResponse<IAddressQuota[]>) => res.body)
            )
            .subscribe(
                (res: IAddressQuota[]) => {
                    this.addressQuotas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAddressQuotas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAddressQuota) {
        return item.id;
    }

    registerChangeInAddressQuotas() {
        this.eventSubscriber = this.eventManager.subscribe('addressQuotaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
