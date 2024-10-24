import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RowSelectionService {

  private rowSelectionSource = new BehaviorSubject<{ row: any, isSidebarOpen: boolean }>({ row: null, isSidebarOpen: false });

 
  rowSelection$ = this.rowSelectionSource.asObservable();


  selectRow(row: any, isSidebarOpen: boolean) {
    this.rowSelectionSource.next({ row, isSidebarOpen });
  }
}
