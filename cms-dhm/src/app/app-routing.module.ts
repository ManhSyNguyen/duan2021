import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/clothes/dashboard/dashboard.component';
import { ProductComponent } from './component/clothes/product/product.component';
const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'product', component: ProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
