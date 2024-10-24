import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private totalAmountSource = new BehaviorSubject<number>(0);  
  totalAmount$ = this.totalAmountSource.asObservable(); 

  constructor(private http: HttpClient) { }


  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(environment.urlApi);
  }

  updateTotalAmount(transactions: { amount: number }[]): void {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    this.totalAmountSource.next(total);      
  }
}
