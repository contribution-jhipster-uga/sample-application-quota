import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressQuota } from 'app/shared/model/address-quota.model';

@Component({
    selector: 'jhi-address-quota-detail',
    templateUrl: './address-quota-detail.component.html'
})
export class AddressQuotaDetailComponent implements OnInit {
    addressQuota: IAddressQuota;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ addressQuota }) => {
            this.addressQuota = addressQuota;
        });
    }

    previousState() {
        window.history.back();
    }
}
