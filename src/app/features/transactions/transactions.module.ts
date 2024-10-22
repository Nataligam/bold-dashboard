import { NgModule } from '@angular/core';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsRoutingModule } from './transacions-routing.module';
import { TransactionsTableComponent } from "./components/transactions-table/transactions-table.component";

@NgModule({
  declarations: [
    DashboardComponent,
    TransactionsTableComponent
  ],
  imports: [
    TransactionsRoutingModule,
],
})
export class TransactionsModule { }
