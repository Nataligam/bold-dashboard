import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.prod';
import { TransactionsService } from './transactions.service';

const dummyTransactions = [
  { "id": "GZENKKQ6GLECU", "status": "SUCCESSFUL", "paymentMethod": "PSE", "salesType": "TERMINAL", "createdAt": 1729728000000, "transactionReference": 5378, "amount": 9996659 },
  { "id": "GZENELQVOXLHP", "status": "SUCCESSFUL", "paymentMethod": "CARD", "salesType": "TERMINAL", "createdAt": 1729555200000, "transactionReference": 8443, "amount": 3629958, "franchise": "MASTERCARD" }
];

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransactionsService
      ]
    });
    service = TestBed.inject(TransactionsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions from API', (doneFn) => {

    service.getTransactions().subscribe(transactions => {
      expect(transactions.length).toBe(2);
      expect(transactions).toEqual(dummyTransactions);
      doneFn();
    });

    const req = httpController.expectOne(environment.urlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyTransactions);
  });

  it('should get total amount when there are transaction', () => {
    service.updateTotalAmount(dummyTransactions);
    service.totalAmount$.subscribe(total => {
      expect(total).toBe(13626617);
    });
  });

  it('should get 0 amount when there are not transaction', () => {
    service.updateTotalAmount([]);
    service.totalAmount$.subscribe(total => {
      expect(total).toBe(0);
    });
  });
});
