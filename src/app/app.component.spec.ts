import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { AppComponent } from './app.component';

// alternate to contact-detailcomponent
@Component({
  selector: 'app-contact-detail',
})
export class DummyClass {
  @Input() cols: string[] | any = [];
  @Input() tableno: number = 0;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ButtonsModule],
      declarations: [AppComponent, DummyClass],
    }).compileComponents();
  });
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit(`should have as title 'contact-directory'`, () => {
    expect(component.title).toEqual('contact-directory');
  });

  xit('should render title', () => {
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'contact-directory component is running!'
    );
  });

  it('should contain three btns', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(
      component.tablescols.length
    );
  });

  it('should show table on button click', () => {
    expect(
      fixture.nativeElement.querySelectorAll('app-contact-detail').length
    ).toBe(0);

    for (let i in component.tablescols) {
      component.displayTable(i);
      fixture.detectChanges();
    }
    expect(
      fixture.nativeElement.querySelectorAll('app-contact-detail').length
    ).toBe(component.tablescols.length);
  });

  it('should hide table on  2nd time button click', () => {
    component.displayTable(1);
    fixture.detectChanges();
    component.displayTable(1);
    fixture.detectChanges();
    console.log(fixture.nativeElement.querySelectorAll('app-contact-detail'));
    expect(
      fixture.nativeElement.querySelectorAll('app-contact-detail').length
    ).toBe(0);
  });
});
