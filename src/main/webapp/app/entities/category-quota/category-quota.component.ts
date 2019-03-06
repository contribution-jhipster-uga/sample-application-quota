import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategoryQuota } from 'app/shared/model/category-quota.model';
import { AccountService } from 'app/core';
import { CategoryQuotaService } from './category-quota.service';

@Component({
    selector: 'jhi-category-quota',
    templateUrl: './category-quota.component.html'
})
export class CategoryQuotaComponent implements OnInit, OnDestroy {
    categoryQuotas: ICategoryQuota[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected categoryQuotaService: CategoryQuotaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.categoryQuotaService
            .query()
            .pipe(
                filter((res: HttpResponse<ICategoryQuota[]>) => res.ok),
                map((res: HttpResponse<ICategoryQuota[]>) => res.body)
            )
            .subscribe(
                (res: ICategoryQuota[]) => {
                    this.categoryQuotas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCategoryQuotas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICategoryQuota) {
        return item.id;
    }

    registerChangeInCategoryQuotas() {
        this.eventSubscriber = this.eventManager.subscribe('categoryQuotaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
