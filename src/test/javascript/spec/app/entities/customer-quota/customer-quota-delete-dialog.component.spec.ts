/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { CustomerQuotaDeleteDialogComponent } from 'app/entities/customer-quota/customer-quota-delete-dialog.component';
import { CustomerQuotaService } from 'app/entities/customer-quota/customer-quota.service';

describe('Component Tests', () => {
    describe('CustomerQuota Management Delete Component', () => {
        let comp: CustomerQuotaDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerQuotaDeleteDialogComponent>;
        let service: CustomerQuotaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CustomerQuotaDeleteDialogComponent]
            })
                .overrideTemplate(CustomerQuotaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerQuotaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerQuotaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
