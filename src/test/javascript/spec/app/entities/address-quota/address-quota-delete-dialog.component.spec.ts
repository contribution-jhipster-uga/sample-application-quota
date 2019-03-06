/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { AddressQuotaDeleteDialogComponent } from 'app/entities/address-quota/address-quota-delete-dialog.component';
import { AddressQuotaService } from 'app/entities/address-quota/address-quota.service';

describe('Component Tests', () => {
    describe('AddressQuota Management Delete Component', () => {
        let comp: AddressQuotaDeleteDialogComponent;
        let fixture: ComponentFixture<AddressQuotaDeleteDialogComponent>;
        let service: AddressQuotaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AddressQuotaDeleteDialogComponent]
            })
                .overrideTemplate(AddressQuotaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressQuotaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressQuotaService);
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
