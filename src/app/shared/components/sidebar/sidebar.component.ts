import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  sidebarVisible: boolean = false;
  @Input() contentTemplate: any;

  show(){
    this.sidebarVisible = true;
  }

}
