import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductQuota } from 'app/shared/model/product-quota.model';

@Component({
    selector: 'jhi-product-quota-detail',
    templateUrl: './product-quota-detail.component.html'
})
export class ProductQuotaDetailComponent implements OnInit {
    productQuota: IProductQuota;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productQuota }) => {
            this.productQuota = productQuota;
        });
    }

    previousState() {
        window.history.back();
    }
}
