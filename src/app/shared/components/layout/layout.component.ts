import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',  
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [NavbarComponent,RouterModule]
})
export class LayoutComponent {

}
