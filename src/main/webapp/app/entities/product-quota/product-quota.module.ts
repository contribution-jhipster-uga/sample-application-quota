import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    ProductQuotaComponent,
    ProductQuotaDetailComponent,
    ProductQuotaUpdateComponent,
    ProductQuotaDeletePopupComponent,
    ProductQuotaDeleteDialogComponent,
    productQuotaRoute,
    productQuotaPopupRoute
} from './';

const ENTITY_STATES = [...productQuotaRoute, ...productQuotaPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductQuotaComponent,
        ProductQuotaDetailComponent,
        ProductQuotaUpdateComponent,
        ProductQuotaDeleteDialogComponent,
        ProductQuotaDeletePopupComponent
    ],
    entryComponents: [
        ProductQuotaComponent,
        ProductQuotaUpdateComponent,
        ProductQuotaDeleteDialogComponent,
        ProductQuotaDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterProductQuotaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
