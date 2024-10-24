import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Column } from 'src/app/core/models/common/column.model';
import { Transaction } from 'src/app/core/models/transactions/transaction.model';
import { CustomFilterPipe } from '../../pipes/custom-filter.pipe';
import { KEY, ROWS, ROWS_PER_PAGE } from '../../utils/utilities';
import { RowSelectionService } from '../../services/row-selection.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule, ReactiveFormsModule, FormsModule, InputTextModule, CommonModule, CustomFilterPipe],
  providers: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  @Input() data!: any[];
  rows: number;
  rowsPerPage: Array<number>;
  key: string;
  searchValue: string = '';
  @Input() titleCaption: string = '';
  @Input() cols: Column[] = [];
  @ViewChild('dt') dt: Table | undefined;

  constructor(private rowSelectionService: RowSelectionService) {
    this.rows = ROWS;
    this.rowsPerPage = ROWS_PER_PAGE;
    this.key = KEY;
  }

  ngOnInit() {
  }

  openDetail(event: any) {
    this.rowSelectionService.selectRow(event.data, true); 
  }

}
