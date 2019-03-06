import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    AddressQuotaComponent,
    AddressQuotaDetailComponent,
    AddressQuotaUpdateComponent,
    AddressQuotaDeletePopupComponent,
    AddressQuotaDeleteDialogComponent,
    addressQuotaRoute,
    addressQuotaPopupRoute
} from './';

const ENTITY_STATES = [...addressQuotaRoute, ...addressQuotaPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressQuotaComponent,
        AddressQuotaDetailComponent,
        AddressQuotaUpdateComponent,
        AddressQuotaDeleteDialogComponent,
        AddressQuotaDeletePopupComponent
    ],
    entryComponents: [
        AddressQuotaComponent,
        AddressQuotaUpdateComponent,
        AddressQuotaDeleteDialogComponent,
        AddressQuotaDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAddressQuotaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
