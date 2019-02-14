/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { CustomerQuotaUpdateComponent } from 'app/entities/customer-quota/customer-quota-update.component';
import { CustomerQuotaService } from 'app/entities/customer-quota/customer-quota.service';
import { CustomerQuota } from 'app/shared/model/customer-quota.model';

describe('Component Tests', () => {
    describe('CustomerQuota Management Update Component', () => {
        let comp: CustomerQuotaUpdateComponent;
        let fixture: ComponentFixture<CustomerQuotaUpdateComponent>;
        let service: CustomerQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CustomerQuotaUpdateComponent]
            })
                .overrideTemplate(CustomerQuotaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerQuotaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerQuotaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CustomerQuota(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.customerQuota = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CustomerQuota();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.customerQuota = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
