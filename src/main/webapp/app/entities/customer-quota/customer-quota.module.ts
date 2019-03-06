import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    CustomerQuotaComponent,
    CustomerQuotaDetailComponent,
    CustomerQuotaUpdateComponent,
    CustomerQuotaDeletePopupComponent,
    CustomerQuotaDeleteDialogComponent,
    customerQuotaRoute,
    customerQuotaPopupRoute
} from './';

const ENTITY_STATES = [...customerQuotaRoute, ...customerQuotaPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CustomerQuotaComponent,
        CustomerQuotaDetailComponent,
        CustomerQuotaUpdateComponent,
        CustomerQuotaDeleteDialogComponent,
        CustomerQuotaDeletePopupComponent
    ],
    entryComponents: [
        CustomerQuotaComponent,
        CustomerQuotaUpdateComponent,
        CustomerQuotaDeleteDialogComponent,
        CustomerQuotaDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCustomerQuotaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
