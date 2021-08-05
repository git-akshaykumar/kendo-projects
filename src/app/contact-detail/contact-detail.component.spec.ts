import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { Observable, of } from 'rxjs';
import { ContactdetailService } from '../services/contactdetail.service';
import { ContactDetailComponent } from './contact-detail.component';

fdescribe('ContactDetailComponent', () => {

  
  let component: ContactDetailComponent;
  
  let fixture: ComponentFixture<ContactDetailComponent>;
  let service: ContactdetailService;
  let data=[ {
    Id: 1,
    Name: "James Butt",
    Email: "jbutt@gmail.com",
    Phone: "504-621-8927",
    Address: "6649 N Blue Gum St",
    City: "New Orleans",
    Country: "Orleans",
    State: "LA",
    Zip: 70116
    }]

  let formData={
    Name: 'akshay', 
    Phone: '8465057427'
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        GridModule,
        ButtonsModule,
        IconsModule,
      ],
      declarations: [ContactDetailComponent],
      providers: [ContactdetailService],
    }).compileComponents();
  });


  // runs before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ContactdetailService);

    component.cols=['Name','Phone']
    spyOn(service,'query').and.returnValue(<Observable<any>>of({'table1':data}))
    fixture.detectChanges();

  });

  // runs after each test
  afterEach(() => {});

  // x before function will not execute
  it('should create', () => {   
    expect(component).toBeTruthy();
  });

  it('form should be undefined unless createForm is called', () => {
    expect(component.formGroup).toBeUndefined();
  });

  it('add row to the table on add-button click ', () => {
    let tr_before=selector('tbody')[0].rows.length
    let buttonElement = selector('.k-button, .k-primary, .k-grid-add-command')[0];
    buttonElement.click();
    fixture.detectChanges();
    let tr_after=selector('tbody')[0].rows.length  
    expect(tr_before).toBeLessThan(tr_after)
  });

  it('on edit-button click open editor', () => {
    let input=selector('input[type=text]')[0]
    expect(input).toBeFalsy()
    let buttonElement = selector('.k-grid-edit-command')[0];
    buttonElement.click();
    fixture.detectChanges()
    input=selector('input[type=text]')[0]
    expect(input).toBeTruthy()
  });


  it('on save button click after Add new it should update view',()=>{
    spyOn(component,'saveHandler')
    let buttonElement = selector('.k-button, .k-primary, .k-grid-add-command')[0];
    buttonElement.click();
    component.formGroup.setValue(formData);
    fixture.detectChanges();
    let inputs=selector('input[type=text]')
    expect(inputs[0].value).toEqual('akshay')
    expect(inputs[1].value).toEqual('8465057427')   
    expect(component.formGroup).toBeDefined(); 
    expect(component.formGroup.value).toBeTruthy(); 
    let saveBtn=selector('button[icon=check]')[0]
    saveBtn.click();
    fixture.detectChanges();
    expect(component.saveHandler).toHaveBeenCalled()
    
  })

  it('on save of ',()=>{
    spyOn(component,'saveHandler')
    let buttonElement = selector('button[icon=edit]')[0];
    buttonElement.click();
    component.formGroup.setValue(formData);
    fixture.detectChanges();
    let inputs=selector('input[type=text]')
    expect(inputs[0].value).toEqual('akshay')
    expect(inputs[1].value).toEqual('8465057427')   
    expect(component.formGroup).toBeDefined(); 
    expect(component.formGroup.value).toBeTruthy(); 

    let saveBtn=selector('button[icon=check]')[0]
    saveBtn.click();
    fixture.detectChanges();

    expect(component.saveHandler).toHaveBeenCalled()
  })

  it('update view on ngOninit call',()=>{
    
      component.tableno=0;
      
      component.ngOnInit();
      fixture.detectChanges()
      
      expect(service.query).toHaveBeenCalled();
      expect(component.view).toEqual(data)
      
  })

  function selector(input: string): any {
    return fixture.debugElement.nativeElement.querySelectorAll(input)
  }

});



/*
 * some of the ways to test a services in components
 * 1. use real service
 * 2. extend real service  //used when service is more complex
 * 3. fake service method using spyon
 */

