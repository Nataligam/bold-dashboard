import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InfoCardComponent } from 'src/app/shared/components/info-card/info-card.component';
import { TransactionsSidebarComponent } from '../../components/transactions-sidebar/transactions-sidebar.component';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, InfoCardComponent, TransactionsTableComponent, MultiSelectModule, ButtonModule, FormsModule, TransactionsSidebarComponent],
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  selectedButton: string = 'Hoy';
  @ViewChild('contentCard', { static: true }) contentCard: any;
  @ViewChild('transactionsTable', { static: true }) transactionsTable: any;
  amountTotal: number = 0;
  options!: any[];
  selectedOptions!: any[];

  constructor(private transactionService: TransactionsService){

  }

  ngOnInit() {
    this.options = [
      { name: 'Cobro con datáfono', code: 'TERMINAL' },
      { name: 'Cobro con link de pago', code: 'PAYMENT_LINK' },
      { name: 'Ver todos', code: 'ALL' },
    ];

    this.transactionService.totalAmount$.subscribe((total: number) => {
      this.amountTotal = total;  
    });
    this.getLocalStorageFilter();
  }
  
  getLocalStorageFilter(){
    const savedButtonDateFilter = localStorage.getItem('selectedButton');
    const savedOptionsMultiselectFilter = localStorage.getItem('selectedOptions');
  
    if (savedButtonDateFilter) {
      this.selectedButton = savedButtonDateFilter;
    }
    if (savedOptionsMultiselectFilter) {
      try {
        this.selectedOptions = JSON.parse(savedOptionsMultiselectFilter);
      } catch (error) {        
        this.selectedOptions = []; 
      }
      
    } 
    this.applyFilters();
  }

  selectButton(type: string) {
    this.selectedButton = type;
    localStorage.setItem('selectedButton', type); 
    this.applyFilters();
  }

  selectFiltersMultiselect() {
    localStorage.setItem('selectedOptions', JSON.stringify(this.selectedOptions));
  }

  applyFilters() {
    this.transactionsTable.applyFilters(this.selectedButton, this.selectedOptions);
  }


}
