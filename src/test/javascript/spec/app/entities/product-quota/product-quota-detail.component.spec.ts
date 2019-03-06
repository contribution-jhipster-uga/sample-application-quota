/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { ProductQuotaDetailComponent } from 'app/entities/product-quota/product-quota-detail.component';
import { ProductQuota } from 'app/shared/model/product-quota.model';

describe('Component Tests', () => {
    describe('ProductQuota Management Detail Component', () => {
        let comp: ProductQuotaDetailComponent;
        let fixture: ComponentFixture<ProductQuotaDetailComponent>;
        const route = ({ data: of({ productQuota: new ProductQuota(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ProductQuotaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductQuotaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductQuotaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productQuota).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
