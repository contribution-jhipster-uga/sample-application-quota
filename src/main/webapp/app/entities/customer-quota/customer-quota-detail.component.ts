import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerQuota } from 'app/shared/model/customer-quota.model';

@Component({
    selector: 'jhi-customer-quota-detail',
    templateUrl: './customer-quota-detail.component.html'
})
export class CustomerQuotaDetailComponent implements OnInit {
    customerQuota: ICustomerQuota;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerQuota }) => {
            this.customerQuota = customerQuota;
        });
    }

    previousState() {
        window.history.back();
    }
}
