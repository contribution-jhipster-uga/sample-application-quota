import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductQuota } from 'app/shared/model/product-quota.model';
import { ProductQuotaService } from './product-quota.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-product-quota-update',
    templateUrl: './product-quota-update.component.html'
})
export class ProductQuotaUpdateComponent implements OnInit {
    productQuota: IProductQuota;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productQuotaService: ProductQuotaService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productQuota }) => {
            this.productQuota = productQuota;
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
        if (this.productQuota.id !== undefined) {
            this.subscribeToSaveResponse(this.productQuotaService.update(this.productQuota));
        } else {
            this.subscribeToSaveResponse(this.productQuotaService.create(this.productQuota));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductQuota>>) {
        result.subscribe((res: HttpResponse<IProductQuota>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
