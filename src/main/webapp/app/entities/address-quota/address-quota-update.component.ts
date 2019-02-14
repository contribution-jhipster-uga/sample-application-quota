import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAddressQuota } from 'app/shared/model/address-quota.model';
import { AddressQuotaService } from './address-quota.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-address-quota-update',
    templateUrl: './address-quota-update.component.html'
})
export class AddressQuotaUpdateComponent implements OnInit {
    addressQuota: IAddressQuota;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected addressQuotaService: AddressQuotaService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ addressQuota }) => {
            this.addressQuota = addressQuota;
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
        if (this.addressQuota.id !== undefined) {
            this.subscribeToSaveResponse(this.addressQuotaService.update(this.addressQuota));
        } else {
            this.subscribeToSaveResponse(this.addressQuotaService.create(this.addressQuota));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddressQuota>>) {
        result.subscribe((res: HttpResponse<IAddressQuota>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
