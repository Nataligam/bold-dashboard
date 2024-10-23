import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Column } from 'src/app/core/models/common/column.model';
import { KEY, ROWS, ROWS_PER_PAGE } from '../../utils/utilities';
import { Transaction } from 'src/app/core/models/transactions/transaction.model';
import { CustomFilterPipe } from '../../pipes/custom-filter.pipe';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule, ReactiveFormsModule, FormsModule, InputTextModule, CommonModule],
  providers: [CustomFilterPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges {

  @Input() data: any;
  filteredData: Transaction[] = [];
  rows: number;
  rowsPerPage: Array<number>;
  key: string;
  searchValue: string = '';
  @Input() titleCaption: string = '';
  @Input() cols: Column[] = [];
  @ViewChild('dt') dt: Table | undefined;

  constructor(private filterPipe: CustomFilterPipe) {
    this.rows = ROWS;
    this.rowsPerPage = ROWS_PER_PAGE;
    this.key = KEY;
  }

  ngOnInit() {
    this.filteredData = this.data;
  }

  ngOnChanges() {
    this.filterData();
  }

  filterData() {
    console.log('entro al filter')
    this.filteredData = this.filterPipe.transform(this.data, this.searchValue);
  }

}
