import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [

  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "transacciones",
        loadChildren: () =>
          import("./features/transactions/transactions.module").then(
            (m) => m.TransactionsModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
