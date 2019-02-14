import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoryQuota } from 'app/shared/model/category-quota.model';
import { CategoryQuotaService } from './category-quota.service';

@Component({
    selector: 'jhi-category-quota-delete-dialog',
    templateUrl: './category-quota-delete-dialog.component.html'
})
export class CategoryQuotaDeleteDialogComponent {
    categoryQuota: ICategoryQuota;

    constructor(
        protected categoryQuotaService: CategoryQuotaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryQuotaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoryQuotaListModification',
                content: 'Deleted an categoryQuota'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-quota-delete-popup',
    template: ''
})
export class CategoryQuotaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoryQuota }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoryQuotaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.categoryQuota = categoryQuota;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/category-quota', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/category-quota', { outlets: { popup: null } }]);
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
