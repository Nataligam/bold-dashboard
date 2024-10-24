import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers:[provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the panel links in the navbar end', () => {
    const linksPanel = fixture.nativeElement.querySelector('#panel-links');
    expect(linksPanel).toBeTruthy(); 

    const links = linksPanel.querySelectorAll('.p-menuitem-link');
    expect(links.length).toBe(2); 

    expect(links[0].textContent).toContain('Mi negocio');
    expect(links[1].textContent).toContain('Ayuda (?)');
  });

  it('should show the image logo', () => {
    const logoElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(logoElement).toBeTruthy();
  });
});
