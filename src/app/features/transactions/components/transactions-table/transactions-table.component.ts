import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/core/models/common/column.model';
import { Transaction } from 'src/app/core/models/transactions/transaction.model';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { BANCOLOMBIA, BANCOLOMBIA_IMG, DAVIPLATA, DAVIPLATA_IMG, DEFAULT_IMG_PAYMENT_METHOD, MASTERCARD, MASTERCARD_IMG, NEQUI, NEQUI_IMG, PSE, PSE_IMG, VISA, VISA_IMG } from 'src/app/shared/utils/utilities';
import { TransactionsService } from '../../services/transactions.service';

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

  constructor(private transactionService: TransactionsService) {

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
      error: (error) => {
        console.error('Error al obtener las transacciones', error);
      }
    });
  }

  getPaymentMethodImage(paymentMethod: string) {
    switch (paymentMethod.toUpperCase()) {
      case VISA:
        return VISA_IMG;
      case MASTERCARD:
        return MASTERCARD_IMG;
      case NEQUI:
        return NEQUI_IMG;
      case BANCOLOMBIA:
        return BANCOLOMBIA_IMG;
      case DAVIPLATA:
        return DAVIPLATA_IMG;
      case PSE:
        return PSE_IMG;
      default:
        return DEFAULT_IMG_PAYMENT_METHOD;
    }
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
        dateFilter = this.isSameDay(transactionDate, new Date());
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
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  }



