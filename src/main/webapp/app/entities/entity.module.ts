import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'category',
                loadChildren: './category/category.module#JhipsterCategoryModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#JhipsterProductModule'
            },
            {
                path: 'customer',
                loadChildren: './customer/customer.module#JhipsterCustomerModule'
            },
            {
                path: 'address',
                loadChildren: './address/address.module#JhipsterAddressModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
