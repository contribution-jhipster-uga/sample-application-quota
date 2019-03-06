import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoryQuota } from 'app/shared/model/category-quota.model';

@Component({
    selector: 'jhi-category-quota-detail',
    templateUrl: './category-quota-detail.component.html'
})
export class CategoryQuotaDetailComponent implements OnInit {
    categoryQuota: ICategoryQuota;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoryQuota }) => {
            this.categoryQuota = categoryQuota;
        });
    }

    previousState() {
        window.history.back();
    }
}
