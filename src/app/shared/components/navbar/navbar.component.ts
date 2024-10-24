import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',  
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [MenubarModule],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
