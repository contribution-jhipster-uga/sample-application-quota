/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { CategoryQuotaUpdateComponent } from 'app/entities/category-quota/category-quota-update.component';
import { CategoryQuotaService } from 'app/entities/category-quota/category-quota.service';
import { CategoryQuota } from 'app/shared/model/category-quota.model';

describe('Component Tests', () => {
    describe('CategoryQuota Management Update Component', () => {
        let comp: CategoryQuotaUpdateComponent;
        let fixture: ComponentFixture<CategoryQuotaUpdateComponent>;
        let service: CategoryQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CategoryQuotaUpdateComponent]
            })
                .overrideTemplate(CategoryQuotaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoryQuotaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryQuotaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CategoryQuota(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categoryQuota = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CategoryQuota();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categoryQuota = entity;
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
