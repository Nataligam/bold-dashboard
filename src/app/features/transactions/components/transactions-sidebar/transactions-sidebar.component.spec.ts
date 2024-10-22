import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsSidebarComponent } from './transactions-sidebar.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
