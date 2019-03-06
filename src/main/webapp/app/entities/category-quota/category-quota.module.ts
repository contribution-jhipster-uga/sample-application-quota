import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    CategoryQuotaComponent,
    CategoryQuotaDetailComponent,
    CategoryQuotaUpdateComponent,
    CategoryQuotaDeletePopupComponent,
    CategoryQuotaDeleteDialogComponent,
    categoryQuotaRoute,
    categoryQuotaPopupRoute
} from './';

const ENTITY_STATES = [...categoryQuotaRoute, ...categoryQuotaPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoryQuotaComponent,
        CategoryQuotaDetailComponent,
        CategoryQuotaUpdateComponent,
        CategoryQuotaDeleteDialogComponent,
        CategoryQuotaDeletePopupComponent
    ],
    entryComponents: [
        CategoryQuotaComponent,
        CategoryQuotaUpdateComponent,
        CategoryQuotaDeleteDialogComponent,
        CategoryQuotaDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCategoryQuotaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
