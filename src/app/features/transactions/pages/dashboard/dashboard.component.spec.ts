import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title card based on the button selected', () => {
    component.selectedButton = 'Esta semana';
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('app-info-card'));
    const titleElement = cardElement.nativeElement.querySelector('p');

    expect(titleElement.textContent).toContain('Tus ventas de Esta semana');
  });

  it('should show the title table based on the button selected', () => {
    component.selectedButton = 'Hoy';
    fixture.detectChanges();

    const tableElement = fixture.debugElement.query(By.css('app-transactions-table'));

    expect(tableElement.componentInstance.titleCaption).toBe('Tus ventas de Hoy');
  });

  it('should set active class when select a button', () => {
    const buttonElement = fixture.debugElement.query(By.css('p-button'));

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(buttonElement.nativeElement.classList.contains('active')).toBeTrue();
  });

  it('should save selected options to localStorage when the multiselect is changed', () => {

    spyOn(localStorage, 'setItem');

    component.options = [
      { name: 'Cobro con datáfono', code: 'TERMINAL' },
      { name: 'Cobro con link de pago', code: 'PAYMENT_LINK' },
    ];

    fixture.detectChanges();

    component.selectedOptions = [{ name: 'Cobro con datáfono', code: 'TERMINAL' }];
    component.selectFiltersMultiselect();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'selectedOptions',
      JSON.stringify([{ name: 'Cobro con datáfono', code: 'TERMINAL' }])
    );
  });

  it('should save selected button to localStorage when the button is active', () => {
    spyOn(localStorage, 'setItem');

    component.selectButton('Hoy');
    fixture.detectChanges();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'selectedButton',
      'Hoy'
    );
  });

});
