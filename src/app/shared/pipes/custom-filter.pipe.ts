import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/app/core/models/transactions/transaction.model';

@Pipe({
  name: 'customFilter',
  standalone: true
})
export class CustomFilterPipe implements PipeTransform {

  transform(transactions: Transaction[], filterText: string): Transaction[] {
    if (!transactions || !filterText) {
      return transactions; 
    }
    const lowerCaseFilter = filterText.toLowerCase();

    return transactions.filter(transaction =>
      transaction.id.toLowerCase().includes(lowerCaseFilter) ||
      this.mapFields(transaction.status).toLowerCase().includes(lowerCaseFilter) ||
      transaction.paymentMethod.toLowerCase().includes(lowerCaseFilter) ||
      transaction.salesType.toLowerCase().includes(lowerCaseFilter) ||
      transaction.transactionReference.toString().includes(lowerCaseFilter) ||
      transaction.amount.toString().includes(lowerCaseFilter) ||
      transaction?.franchise?.toLowerCase().includes(lowerCaseFilter) ||
      String(transaction?.deduction).includes(lowerCaseFilter)
    );
  }

  private mapFields(status: string): string {
    const statusMap: { [key: string]: string } = {
      'REJECTED': 'Cobro no exitoso',
      'SUCCESSFUL': 'Cobro exitoso',
    };
    return statusMap[status] || status; 
  }


}
