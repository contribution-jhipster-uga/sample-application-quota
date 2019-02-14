/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { CategoryQuotaComponent } from 'app/entities/category-quota/category-quota.component';
import { CategoryQuotaService } from 'app/entities/category-quota/category-quota.service';
import { CategoryQuota } from 'app/shared/model/category-quota.model';

describe('Component Tests', () => {
    describe('CategoryQuota Management Component', () => {
        let comp: CategoryQuotaComponent;
        let fixture: ComponentFixture<CategoryQuotaComponent>;
        let service: CategoryQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CategoryQuotaComponent],
                providers: []
            })
                .overrideTemplate(CategoryQuotaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoryQuotaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryQuotaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CategoryQuota(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.categoryQuotas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
