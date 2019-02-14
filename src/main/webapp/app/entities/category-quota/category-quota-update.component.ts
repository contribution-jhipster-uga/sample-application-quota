import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICategoryQuota } from 'app/shared/model/category-quota.model';
import { CategoryQuotaService } from './category-quota.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-category-quota-update',
    templateUrl: './category-quota-update.component.html'
})
export class CategoryQuotaUpdateComponent implements OnInit {
    categoryQuota: ICategoryQuota;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected categoryQuotaService: CategoryQuotaService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categoryQuota }) => {
            this.categoryQuota = categoryQuota;
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
        if (this.categoryQuota.id !== undefined) {
            this.subscribeToSaveResponse(this.categoryQuotaService.update(this.categoryQuota));
        } else {
            this.subscribeToSaveResponse(this.categoryQuotaService.create(this.categoryQuota));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoryQuota>>) {
        result.subscribe((res: HttpResponse<ICategoryQuota>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
