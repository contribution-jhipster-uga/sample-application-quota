import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICustomerQuota } from 'app/shared/model/customer-quota.model';
import { CustomerQuotaService } from './customer-quota.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-customer-quota-update',
    templateUrl: './customer-quota-update.component.html'
})
export class CustomerQuotaUpdateComponent implements OnInit {
    customerQuota: ICustomerQuota;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected customerQuotaService: CustomerQuotaService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerQuota }) => {
            this.customerQuota = customerQuota;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customerQuota.id !== undefined) {
            this.subscribeToSaveResponse(this.customerQuotaService.update(this.customerQuota));
        } else {
            this.subscribeToSaveResponse(this.customerQuotaService.create(this.customerQuota));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerQuota>>) {
        result.subscribe((res: HttpResponse<ICustomerQuota>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
