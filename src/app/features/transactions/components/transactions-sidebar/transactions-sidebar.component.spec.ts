import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsSidebarComponent } from './transactions-sidebar.component';
import { By } from '@angular/platform-browser';

const dataDetailMock = { "id": "GZENKKQ6GLECU", "status": "SUCCESSFUL", "paymentMethod": "PSE", "salesType": "TERMINAL", "createdAt": 1729728000000, "transactionReference": 5378, "amount": 9996659 };

describe('TransactionsSidebarComponent', () => {
  let component: TransactionsSidebarComponent;
  let fixture: ComponentFixture<TransactionsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsSidebarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionsSidebarComponent);
    component = fixture.componentInstance;
    component.dataDetail = dataDetailMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
