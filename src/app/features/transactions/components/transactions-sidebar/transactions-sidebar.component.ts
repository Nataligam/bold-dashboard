import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Transaction } from 'src/app/core/models/transactions/transaction.model';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { RowSelectionService } from 'src/app/shared/services/row-selection.service';
import { getImage } from 'src/app/shared/utils/utilities';

@Component({
  selector: 'app-transactions-sidebar',
  templateUrl: './transactions-sidebar.component.html',
  styleUrl: './transactions-sidebar.component.scss',
  standalone: true,
  imports:[SidebarComponent, CommonModule, DividerModule]
})
export class TransactionsSidebarComponent implements OnInit {

  dataDetail!: Transaction;
  isSidebarOpen: boolean = false;
  @ViewChild('sidebar', { static: true }) sidebar: any;

  constructor(private rowSelectionService: RowSelectionService){
    
  }

  ngOnInit() {    
    this.rowSelectionService.rowSelection$.subscribe(({ row, isSidebarOpen }) => {
      this.dataDetail = row;
      if(isSidebarOpen){
        this.sidebar.show();
      }
    });
  }

  getPaymentMethodImage(paymentMethod: any) {
    return getImage(paymentMethod);
  }

}
