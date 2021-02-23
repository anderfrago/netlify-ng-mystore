import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';

const routes: Routes = [
    {path: '',                    component: HomeComponent},
    {path: 'products/:id/new', component: ProductNewComponent},
    {path: 'products/:productId', component: ProductDetailComponent},
    {path: 'products/:id/edit', component: ProductEditComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
