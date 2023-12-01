import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { UserComponent } from './component/admin/user/user.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { AproductComponent } from './component/admin/aproduct/aproduct.component';
import { AordersComponent } from './component/admin/aorders/aorders.component';
import { VendorComponent } from './component/admin/vendor/vendor.component';
import { VendorHomeComponent } from './component/vendorhome/vendorhome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'order', component: OrderComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
  {
    path: 'adminproduct',
    component: AproductComponent,
    canActivate: [authGuard],
  },
  { path: 'adminorder', component: AordersComponent, canActivate: [authGuard] },
  { path: 'vendor', component: VendorComponent, canActivate: [authGuard] },
  {
    path: 'vendorhome',
    component: VendorHomeComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
