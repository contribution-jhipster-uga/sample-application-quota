import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerQuota } from 'app/shared/model/customer-quota.model';
import { CustomerQuotaService } from './customer-quota.service';

@Component({
    selector: 'jhi-customer-quota-delete-dialog',
    templateUrl: './customer-quota-delete-dialog.component.html'
})
export class CustomerQuotaDeleteDialogComponent {
    customerQuota: ICustomerQuota;

    constructor(
        protected customerQuotaService: CustomerQuotaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerQuotaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerQuotaListModification',
                content: 'Deleted an customerQuota'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-quota-delete-popup',
    template: ''
})
export class CustomerQuotaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerQuota }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CustomerQuotaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.customerQuota = customerQuota;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/customer-quota', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/customer-quota', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
