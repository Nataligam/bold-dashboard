import { CustomFilterPipe } from './custom-filter.pipe';

const statusParam = 'Cobro exitoso';
const idParam = 'GZENKKQ6GLECU';
const paymentMethodParam = 'PSE';
const amountParam = 9996659;

const dummyTransactions = [
  { "id": "GZENKKQ6GLECU", "status": "SUCCESSFUL", "paymentMethod": "PSE", "salesType": "TERMINAL", "createdAt": 1729728000000, "transactionReference": 5378, "amount": 9996659 },
  { "id": "GZENELQVOXLHP", "status": "SUCCESSFUL", "paymentMethod": "CARD", "salesType": "TERMINAL", "createdAt": 1729555200000, "transactionReference": 8443, "amount": 3629958, "franchise": "MASTERCARD" }
];

describe('CustomFilterPipe', () => {
  let pipe: CustomFilterPipe;

  beforeEach(() => {
    pipe = new CustomFilterPipe();
  });

  it('create an instance', () => {
    const pipe = new CustomFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the same list of transactions when the list is empty', () => {
    const filtered = pipe.transform([], statusParam);
    expect(filtered).toEqual([]);
  });

  it('should return the same list of transactions when the searchField is null', () => {
    const filtered = pipe.transform(dummyTransactions, '');
    expect(filtered).toEqual(dummyTransactions);
  });

  it('should return transactions matching the filter text in the id field', () => {
    const filtered = pipe.transform(dummyTransactions, idParam);
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('GZENKKQ6GLECU');
  });

  it('should return transactions matching the filter text in the status field', () => {
    const filtered = pipe.transform(dummyTransactions, statusParam);
    expect(filtered.length).toBe(2);
    expect(filtered[0].status).toBe('SUCCESSFUL');
    expect(filtered[1].status).toBe('SUCCESSFUL');
  });

  it('should return transactions matching the filter text in the paymentMethod field', () => {
    const filtered = pipe.transform(dummyTransactions, paymentMethodParam);
    expect(filtered.length).toBe(1);
    expect(filtered[0].paymentMethod).toBe(paymentMethodParam);
  });

  it('should return transactions matching the filter text in the ammount field', () => {
    const filtered = pipe.transform(dummyTransactions, String(amountParam));
    expect(filtered.length).toBe(1);
    expect(filtered[0].amount).toBe(amountParam);
  });
});
