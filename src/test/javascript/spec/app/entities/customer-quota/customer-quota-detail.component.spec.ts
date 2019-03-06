/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { CustomerQuotaDetailComponent } from 'app/entities/customer-quota/customer-quota-detail.component';
import { CustomerQuota } from 'app/shared/model/customer-quota.model';

describe('Component Tests', () => {
    describe('CustomerQuota Management Detail Component', () => {
        let comp: CustomerQuotaDetailComponent;
        let fixture: ComponentFixture<CustomerQuotaDetailComponent>;
        const route = ({ data: of({ customerQuota: new CustomerQuota(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CustomerQuotaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerQuotaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerQuotaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customerQuota).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
