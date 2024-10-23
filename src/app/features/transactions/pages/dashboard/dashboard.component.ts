import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoCardComponent } from 'src/app/shared/components/info-card/info-card.component';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, InfoCardComponent, TransactionsTableComponent, MultiSelectModule, ButtonModule, FormsModule],
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  selectedButton: string = 'Hoy';
  @ViewChild('contentCard', { static: true }) contentCard: any;
  @ViewChild('transactionsTable', { static: true }) transactionsTable: any;
  amountTotal: string = '0';
  options!: any[];
  selectedOptions!: any[];

  ngOnInit() {
    this.options = [
      { name: 'Cobro con datáfono', code: 'TERMINAL' },
      { name: 'Cobro con link de pago', code: 'PAYMENT_LINK' },
      { name: 'Ver todos', code: 'ALL' },
    ];

    const savedButtonDateFilter = localStorage.getItem('selectedButton');
    const savedOptionsMultiselectFilter = localStorage.getItem('selectedOptions');

    if (savedButtonDateFilter) {
      this.selectedButton = savedButtonDateFilter;
    }

    if (savedOptionsMultiselectFilter) {
      this.selectedOptions = JSON.parse(savedOptionsMultiselectFilter);
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
