import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DataBindingDirective,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

import { ContactdetailService } from '../services/contactdetail.service';
import { ContactInterface } from '../sharedData';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  @Input() cols: string[] | any = [];
  @Input() tableno: number = 0;
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective | any;

  tables = ['table1', 'table2', 'table3'];

  editToogle: boolean = true;
  viewData: ContactInterface[] = [];
  view: ContactInterface[] | any = [];
  public formGroup: FormGroup|any;
  private editedRowIndex: number | undefined;

  loading: boolean = false;
  constructor(public service: ContactdetailService) {
  }

  ngOnInit() {
    if (this.cols != null && this.cols.length != 0) {
      this.loading = true;

      this.service.query().subscribe((grid) => {

        
        this.view = grid[this.tables[this.tableno]];
        /* //to accept from json server
         * this.view = grid;
         */
        
        
        this.viewData = [...this.view];
        this.loading = false;
      });
      

    

    }
  }

  public addHandler($event: any) {
    
    // $event:{action: "add", dataItem: undefined, sender: GridComponent}
    this.closeEditor($event.sender);
    this.createForm();
    $event.sender.addRow(this.formGroup);
  }

  public editHandler($event: any) {
    // console.log($event); 
    const sender = $event.sender;
    this.closeEditor(sender);
    this.createForm($event.dataItem);
    sender.editRow($event.rowIndex, this.formGroup);
  }

  public cancelHandler($event: any) {
    this.closeEditor($event.sender, $event.rowIndex);
  }

  public saveHandler($event: any) {
    if(this.formGroup==undefined) return;
    const record: ContactInterface = this.formGroup.value;

    if (this.formGroup.invalid) {
      alert('invalid data');
      return;
    }

    for (let key in this.formGroup.value) {
      if (this.formGroup.value[key] === '') {
        alert('all fields are required');
        return;
      }
    }

    const action = $event.isNew ? 'create' : 'update';

    if (action === 'create') {
      this.view.unshift(record);
      this.viewData = [...this.view];
      alert('inserted row successfully');
      // from json-server
      // this.service.postData(record).subscribe((res) => {
      //   this.viewData = res;
      // });
    } else {
      this.editedRowIndex = $event.rowIndex;
      this.view[$event.rowIndex] = this.formGroup.value; //arr should be modified
      this.viewData = [...this.view]; //to update view
      alert('udapted data');
      // from json server
      // this.service.update(record).subscribe(()=>{console.log('updated record successfully')})
    }

    this.closeEditor($event.sender);
  }

  public removeHandler($event: any) {
    alert('deleting row ' + ($event.rowIndex + 1));

    this.view.splice(this.viewData.indexOf($event.dataItem), 1);
    this.viewData = [...this.view];
    // from json-server
    // this.service.delete($event.dataItem?.Id).subscribe(()=>{})
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private createForm(dataItem: any = undefined) {
    this.formGroup = new FormGroup({});

    for (let name of this.cols) {
      this.formGroup.addControl(
        name,
        new FormControl('', [Validators.required, Validators.minLength(2)])
      );
    }

    if (dataItem != undefined) {
      for (let name of this.cols) {
        this.formGroup.get(name).value = dataItem[name];
      }
    }
  }

  public search($event: any): void {
    let inputValue = $event.target.value.trim();

    let temp: Array<any> = [];
    for (let c of this.cols) {
      temp.push({
        field: c,
        operator: 'contains',
        value: inputValue,
      });
    }

    this.viewData = process(this.view, {
      filter: {
        logic: 'or',
        filters: temp,
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}
