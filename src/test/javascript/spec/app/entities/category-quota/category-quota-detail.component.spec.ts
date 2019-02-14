/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { CategoryQuotaDetailComponent } from 'app/entities/category-quota/category-quota-detail.component';
import { CategoryQuota } from 'app/shared/model/category-quota.model';

describe('Component Tests', () => {
    describe('CategoryQuota Management Detail Component', () => {
        let comp: CategoryQuotaDetailComponent;
        let fixture: ComponentFixture<CategoryQuotaDetailComponent>;
        const route = ({ data: of({ categoryQuota: new CategoryQuota(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CategoryQuotaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CategoryQuotaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoryQuotaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.categoryQuota).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
