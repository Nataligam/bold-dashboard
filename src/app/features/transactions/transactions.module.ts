import { NgModule } from '@angular/core';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsRoutingModule } from './transacions-routing.module';
import { TransactionsTableComponent } from "./components/transactions-table/transactions-table.component";
import { InfoCardComponent } from "../../shared/components/info-card/info-card.component";
import { TableComponent } from "../../shared/components/table/table.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TransactionsService } from './services/transactions.service';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    TransactionsRoutingModule,
    TransactionsTableComponent,
    InfoCardComponent,
    TableComponent
],
providers: [TransactionsService]
})
export class TransactionsModule { }
