import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductQuota } from 'app/shared/model/product-quota.model';
import { ProductQuotaService } from './product-quota.service';

@Component({
    selector: 'jhi-product-quota-delete-dialog',
    templateUrl: './product-quota-delete-dialog.component.html'
})
export class ProductQuotaDeleteDialogComponent {
    productQuota: IProductQuota;

    constructor(
        protected productQuotaService: ProductQuotaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productQuotaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productQuotaListModification',
                content: 'Deleted an productQuota'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-quota-delete-popup',
    template: ''
})
export class ProductQuotaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productQuota }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductQuotaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productQuota = productQuota;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/product-quota', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/product-quota', { outlets: { popup: null } }]);
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
