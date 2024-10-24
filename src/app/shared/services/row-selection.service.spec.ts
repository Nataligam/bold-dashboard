import { TestBed } from '@angular/core/testing';

import { RowSelectionService } from './row-selection.service';

const dummyRow = 
  { "id": "GZENKKQ6GLECU", "status": "SUCCESSFUL", "paymentMethod": "PSE", "salesType": "TERMINAL", "createdAt": 1729728000000, "transactionReference": 5378, "amount": 9996659 };

describe('RowSelectionService', () => {
  let service: RowSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[RowSelectionService]
    });
    service = TestBed.inject(RowSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when row is null and isSidebarOpen is false', (done) => {
    service.rowSelection$.subscribe(selection => {
      expect(selection.row).toBeNull();
      expect(selection.isSidebarOpen).toBeFalse();
      done();
    });
  });

  it('should return value from observable', (doneFn) => {
    const isSidebarOpen = true;
    service.selectRow(dummyRow, isSidebarOpen);

    service.rowSelection$.subscribe(selection => {
      expect(selection.row).toEqual(dummyRow);
      expect(selection.isSidebarOpen).toBeTrue();
      doneFn();
    });
  });
});
