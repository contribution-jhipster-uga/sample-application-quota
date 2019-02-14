/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { AddressQuotaUpdateComponent } from 'app/entities/address-quota/address-quota-update.component';
import { AddressQuotaService } from 'app/entities/address-quota/address-quota.service';
import { AddressQuota } from 'app/shared/model/address-quota.model';

describe('Component Tests', () => {
    describe('AddressQuota Management Update Component', () => {
        let comp: AddressQuotaUpdateComponent;
        let fixture: ComponentFixture<AddressQuotaUpdateComponent>;
        let service: AddressQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AddressQuotaUpdateComponent]
            })
                .overrideTemplate(AddressQuotaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressQuotaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressQuotaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AddressQuota(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.addressQuota = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AddressQuota();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.addressQuota = entity;
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
