import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTableComponent } from './transactions-table.component';
import { TransactionsService } from '../../services/transactions.service';
import { provideHttpClient } from '@angular/common/http';
import { ToastUtil } from 'src/app/shared/utils/toast';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

const dummyTransactions = [
  { "id": "GZENKKQ6GLECU", "status": "SUCCESSFUL", "paymentMethod": "PSE", "salesType": "TERMINAL", "createdAt": 1729728000000, "transactionReference": 5378, "amount": 9996659 },
  { "id": "GZENELQVOXLHP", "status": "SUCCESSFUL", "paymentMethod": "CARD", "salesType": "TERMINAL", "createdAt": 1729555200000, "transactionReference": 8443, "amount": 3629958, "franchise": "MASTERCARD" }
];

describe('TransactionsTableComponent', () => {
  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;
  let transactionServiceMock: any;

  beforeEach(async () => {
    transactionServiceMock = {
      getTransactions: jasmine.createSpy('getTransactions').and.returnValue(of({ data: dummyTransactions })),
      updateTotalAmount: jasmine.createSpy('updateTotalAmount')
    };

    await TestBed.configureTestingModule({
      imports: [TransactionsTableComponent],
      providers: [
        TransactionsService,
        provideHttpClient(),
        ToastUtil,
        MessageService,
        { provide: TransactionsService, useValue: transactionServiceMock },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the load transactions', () => {
    expect(transactionServiceMock.getTransactions).toHaveBeenCalled();
    expect(component.transactions.length).toBe(2); 
  });

  it('should calculate total amount', () => {
    component.filteredTransactions = dummyTransactions;
    component.calculateTotalSales();
    expect(transactionServiceMock.updateTotalAmount).toHaveBeenCalledWith(dummyTransactions);
  });

});
