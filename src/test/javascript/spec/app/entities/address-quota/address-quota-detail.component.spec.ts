/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { AddressQuotaDetailComponent } from 'app/entities/address-quota/address-quota-detail.component';
import { AddressQuota } from 'app/shared/model/address-quota.model';

describe('Component Tests', () => {
    describe('AddressQuota Management Detail Component', () => {
        let comp: AddressQuotaDetailComponent;
        let fixture: ComponentFixture<AddressQuotaDetailComponent>;
        const route = ({ data: of({ addressQuota: new AddressQuota(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AddressQuotaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AddressQuotaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressQuotaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.addressQuota).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
