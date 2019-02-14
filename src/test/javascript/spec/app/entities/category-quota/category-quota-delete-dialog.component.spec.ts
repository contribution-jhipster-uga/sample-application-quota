/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { CategoryQuotaDeleteDialogComponent } from 'app/entities/category-quota/category-quota-delete-dialog.component';
import { CategoryQuotaService } from 'app/entities/category-quota/category-quota.service';

describe('Component Tests', () => {
    describe('CategoryQuota Management Delete Component', () => {
        let comp: CategoryQuotaDeleteDialogComponent;
        let fixture: ComponentFixture<CategoryQuotaDeleteDialogComponent>;
        let service: CategoryQuotaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CategoryQuotaDeleteDialogComponent]
            })
                .overrideTemplate(CategoryQuotaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoryQuotaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryQuotaService);
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
