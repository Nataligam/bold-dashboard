import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCardComponent } from './info-card.component';
import { By } from '@angular/platform-browser';
import { Component, TemplateRef, ViewChild } from '@angular/core';


@Component({
  template: `
    <ng-template #contentTemplateTest>
      <p id="template">This is the dummy template from the parent</p>
    </ng-template>
  `
})
class TestComponent {
  @ViewChild('contentTemplateTest', { static: true }) contentTemplateTest!: TemplateRef<any>;
}

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<InfoCardComponent>;
  let testFixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testFixture = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();
    testComponent = testFixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the titleCard', () => {
    component.titleCard = 'Title Card';
    fixture.detectChanges(); 

    const titleElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(titleElement.textContent).toContain('Title Card');
  });

  it('should show contentTemplate when it is provided by the parent', () => {
    
    component.contentTemplate = testFixture.componentInstance.contentTemplateTest;
    fixture.detectChanges();
    
    const contentElement = fixture.debugElement.query(By.css('#template'));
    expect(contentElement).toBeTruthy();
    expect(contentElement.nativeElement.textContent).toContain('This is the dummy template from the parent'); 
  });

  it('should not show contentTemplate when it is not provided by the parent', () => {
    
    component.contentTemplate = null;
    fixture.detectChanges();
    
    const contentElement = fixture.debugElement.query(By.css('#template'));
    expect(contentElement).toBeFalsy();    
  });
  
});
