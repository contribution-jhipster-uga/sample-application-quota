/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { ProductQuotaComponent } from 'app/entities/product-quota/product-quota.component';
import { ProductQuotaService } from 'app/entities/product-quota/product-quota.service';
import { ProductQuota } from 'app/shared/model/product-quota.model';

describe('Component Tests', () => {
    describe('ProductQuota Management Component', () => {
        let comp: ProductQuotaComponent;
        let fixture: ComponentFixture<ProductQuotaComponent>;
        let service: ProductQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ProductQuotaComponent],
                providers: []
            })
                .overrideTemplate(ProductQuotaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductQuotaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductQuotaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductQuota(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productQuotas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
