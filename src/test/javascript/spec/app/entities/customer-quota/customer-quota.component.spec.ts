/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { CustomerQuotaComponent } from 'app/entities/customer-quota/customer-quota.component';
import { CustomerQuotaService } from 'app/entities/customer-quota/customer-quota.service';
import { CustomerQuota } from 'app/shared/model/customer-quota.model';

describe('Component Tests', () => {
    describe('CustomerQuota Management Component', () => {
        let comp: CustomerQuotaComponent;
        let fixture: ComponentFixture<CustomerQuotaComponent>;
        let service: CustomerQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CustomerQuotaComponent],
                providers: []
            })
                .overrideTemplate(CustomerQuotaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerQuotaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerQuotaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CustomerQuota(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.customerQuotas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
