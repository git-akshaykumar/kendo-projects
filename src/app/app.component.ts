import { Component, OnInit } from '@angular/core';
import { ContactDetails } from './sharedData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['']
})
export class AppComponent implements OnInit {
  showTable: boolean[] = [];
  title = 'contact-directory';
  contactdetails = ContactDetails;
  columns = ['Id', 'State'];

  tablescols = [
    ['Name', 'Phone', 'Country'],
    ['Name', 'Email', 'Country'],
    ['Phone', 'Address', 'City']
  ];

  ngOnInit(): void {
    for (let i in this.tablescols) {
      this.showTable.push(false);
    }
  }

  displayTable(num: any) {
    this.showTable[num] = !this.showTable[num];
  }
}
