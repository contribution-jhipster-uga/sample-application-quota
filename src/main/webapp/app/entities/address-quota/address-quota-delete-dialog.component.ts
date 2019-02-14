import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAddressQuota } from 'app/shared/model/address-quota.model';
import { AddressQuotaService } from './address-quota.service';

@Component({
    selector: 'jhi-address-quota-delete-dialog',
    templateUrl: './address-quota-delete-dialog.component.html'
})
export class AddressQuotaDeleteDialogComponent {
    addressQuota: IAddressQuota;

    constructor(
        protected addressQuotaService: AddressQuotaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressQuotaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'addressQuotaListModification',
                content: 'Deleted an addressQuota'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-quota-delete-popup',
    template: ''
})
export class AddressQuotaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ addressQuota }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AddressQuotaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.addressQuota = addressQuota;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/address-quota', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/address-quota', { outlets: { popup: null } }]);
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
