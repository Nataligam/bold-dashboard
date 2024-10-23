import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Tooltip, TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CardModule, CommonModule, TooltipModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent implements OnInit {

  @Input() titleCard: string = '';
  @Input() contentTemplate!: TemplateRef<any>;  
  @Input() tooltipText: string = '';

  ngOnInit(){
  }

}
