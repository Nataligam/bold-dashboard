import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';

const mockData = [
  { "id": "GZENKKQ6GLECU", "status": "SUCCESSFUL", "paymentMethod": "PSE" },
  { "id": "GZENELQVOXLHP", "status": "SUCCESSFUL", "paymentMethod": "CARD" }
];

const mockColumns = [
  { field: 'id', header: 'ID' },
  { field: 'status', header: 'Estado' },
  { field: 'paymentMethod', header: 'Método de pago' }
];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    component.cols = mockColumns;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show table headers correctly', () => {
    const headerCells = fixture.debugElement.queryAll(By.css('th'));

    expect(headerCells.length).toBe(mockColumns.length);
    expect(headerCells[0].nativeElement.textContent.trim()).toBe('ID');
    expect(headerCells[1].nativeElement.textContent.trim()).toBe('Estado');
    expect(headerCells[2].nativeElement.textContent.trim()).toBe('Método de pago');
  });

  it('should show correct data in the rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockData.length);

    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('GZENKKQ6GLECU');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('SUCCESSFUL');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('PSE');
  });

  it('should show empty message when no data is provided', () => {
    component.data = [];
    fixture.detectChanges();

    const emptyMessageRow = fixture.debugElement.query(By.css('tbody tr td'));
    expect(emptyMessageRow.nativeElement.textContent.trim()).toBe('No customers found.');
  });

  it('should filter one register on search input by ID', () => {
    const inputElement = fixture.debugElement.query(By.css('#search-field')).nativeElement;
    inputElement.value = 'GZENKKQ6GLECU';
    inputElement.dispatchEvent(new Event('input')); 
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
    const filteredRowCells = rows[0].queryAll(By.css('td'));
    expect(filteredRowCells[0].nativeElement.textContent.trim()).toBe('GZENKKQ6GLECU');
  });

  it('should filter two register on search input by status', () => {
    const inputElement = fixture.debugElement.query(By.css('#search-field')).nativeElement;
    inputElement.value = 'Cobro exitoso';
    inputElement.dispatchEvent(new Event('input')); 
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
  });

});
