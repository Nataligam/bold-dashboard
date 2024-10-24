import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/core/models/common/column.model';
import { Transaction } from 'src/app/core/models/transactions/transaction.model';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { getImage, isSameDay } from 'src/app/shared/utils/utilities';
import { TransactionsService } from '../../services/transactions.service';
import { ToastUtil } from 'src/app/shared/utils/toast';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
  standalone: true,
  imports: [TableComponent, CommonModule]
})
export class TransactionsTableComponent implements OnInit, AfterViewInit {

  @Input() titleCaption!: string;
  cols: Column[] = [];

  transactions: Transaction[] = [];
  filteredTransactions: any[] = [];

  @ViewChild('statusTemplate', { static: true }) statusTemplate: any;
  @ViewChild('createAtTemplate', { static: true }) createAtTemplate: any;
  @ViewChild('paymentMethodTemplate', { static: true }) paymentMethodTemplate: any;
  @ViewChild('amountTemplate', { static: true }) amountTemplate: any;

  constructor(private transactionService: TransactionsService, private toast: ToastUtil) {

  }

  ngOnInit() {
    this.getTransactions();
  }

  ngAfterViewInit() {
    this.cols = [{ field: 'status', header: 'Transacción', templateRef: this.statusTemplate, isCustom: true },
    { field: 'createdAt', header: 'Fecha y hora', templateRef: this.createAtTemplate, isCustom: true },
    { field: 'paymentMethod', header: 'Método de pago', templateRef: this.paymentMethodTemplate, isCustom: true },
    { field: 'id', header: 'Id transacción Bold' },
    { field: 'amount', header: 'Monto', templateRef: this.amountTemplate, isCustom: true }];
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data: any) => {
        this.transactions = data.data;
        this.filteredTransactions = this.transactions;
      },
      error: () => {
        this.toast.showToast('error', 'Error', 'Ha ocurrido un error al obtener los datos');
      },
      complete: () => {
        this.getLocalStorageFilters();
      }
    });
  }

  getLocalStorageFilters() {
    const savedButtonDateFilter = localStorage.getItem('selectedButton');
    const savedOptionsMultiselectFilter = localStorage.getItem('selectedOptions');
    let selectedButton;
    let selectedOptions;

    if (savedButtonDateFilter) {
      selectedButton = savedButtonDateFilter;
    }

    if (savedOptionsMultiselectFilter) {
      selectedOptions = JSON.parse(savedOptionsMultiselectFilter);
    }

    this.applyFilters(selectedButton, selectedOptions);
  }

  getPaymentMethodImage(paymentMethod: any) {
    return getImage(paymentMethod);
  }

  applyFilters(selectedButton: any, selectedOptions: any) {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfJune = new Date(today.getFullYear(), 5, 1);
    const endOfJune = new Date(today.getFullYear(), 5, 30);

    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);

      let dateFilter = false;

      if (selectedButton === 'Hoy') {
        dateFilter = isSameDay(transactionDate, new Date());
      } else if (selectedButton === 'Esta semana') {
        dateFilter = transactionDate >= startOfWeek && transactionDate <= new Date();
      } else if (selectedButton === 'Junio') {
        dateFilter = transactionDate >= startOfJune && transactionDate <= endOfJune;
      }

      let optionsFilter = (
        selectedOptions.length === 0 ||
        selectedOptions.some((option: any) => option.code === 'ALL') ||
        selectedOptions.some((option: any) => option.code === transaction.salesType)
      );

      return dateFilter && optionsFilter;
    });
    this.calculateTotalSales();
  }

  calculateTotalSales() {
    this.transactionService.updateTotalAmount(this.filteredTransactions);
  }



}



