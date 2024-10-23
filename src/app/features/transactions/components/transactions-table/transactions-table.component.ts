import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/core/models/common/column.model';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { BANCOLOMBIA, BANCOLOMBIA_IMG, DAVIPLATA, DAVIPLATA_IMG, DEFAULT_IMG_PAYMENT_METHOD, MASTERCARD, MASTERCARD_IMG, NEQUI, NEQUI_IMG, PSE, PSE_IMG, TITLE_CAPTION_TABLE_TRANSACIONS, VISA, VISA_IMG } from 'src/app/shared/utils/utilities';
import { TransactionsService } from '../../services/transactions.service';
import { CommonModule } from '@angular/common';
import { Transaction } from 'src/app/core/models/transactions/transaction.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
  standalone: true,
  imports: [TableComponent, CommonModule]
})
export class TransactionsTableComponent implements OnInit, AfterViewInit {

  titleCaption: string;
  transactions: Transaction[] = [];
  cols: Column[] = [];
  @ViewChild('statusTemplate', { static: true }) statusTemplate: any;
  @ViewChild('createAtTemplate', { static: true }) createAtTemplate: any;
  @ViewChild('paymentMethodTemplate', { static: true }) paymentMethodTemplate: any;
  @ViewChild('amountTemplate', { static: true }) amountTemplate: any;

  constructor(private transactionService: TransactionsService) {
    this.titleCaption = TITLE_CAPTION_TABLE_TRANSACIONS;
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

}
