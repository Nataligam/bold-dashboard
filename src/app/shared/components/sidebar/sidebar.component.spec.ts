import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let testFixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent,BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testFixture = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();
    testComponent = testFixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the sidebar when sidebarVisible is true', () => {
    component.sidebarVisible = true;
    fixture.detectChanges();
    
    const sidebarElement = fixture.debugElement.query(By.css('p-sidebar'));
    expect(sidebarElement).toBeTruthy();
    expect(sidebarElement.componentInstance.visible).toBeTrue();
  });


  it('should show contentTemplate when it is provided by the parent', () => {
    component.sidebarVisible = true;
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
