/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { ProductQuotaUpdateComponent } from 'app/entities/product-quota/product-quota-update.component';
import { ProductQuotaService } from 'app/entities/product-quota/product-quota.service';
import { ProductQuota } from 'app/shared/model/product-quota.model';

describe('Component Tests', () => {
    describe('ProductQuota Management Update Component', () => {
        let comp: ProductQuotaUpdateComponent;
        let fixture: ComponentFixture<ProductQuotaUpdateComponent>;
        let service: ProductQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ProductQuotaUpdateComponent]
            })
                .overrideTemplate(ProductQuotaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductQuotaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductQuotaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductQuota(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productQuota = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductQuota();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productQuota = entity;
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
