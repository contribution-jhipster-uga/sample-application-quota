/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { AddressQuotaComponent } from 'app/entities/address-quota/address-quota.component';
import { AddressQuotaService } from 'app/entities/address-quota/address-quota.service';
import { AddressQuota } from 'app/shared/model/address-quota.model';

describe('Component Tests', () => {
    describe('AddressQuota Management Component', () => {
        let comp: AddressQuotaComponent;
        let fixture: ComponentFixture<AddressQuotaComponent>;
        let service: AddressQuotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AddressQuotaComponent],
                providers: []
            })
                .overrideTemplate(AddressQuotaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressQuotaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressQuotaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AddressQuota(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.addressQuotas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
