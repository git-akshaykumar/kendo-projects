import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styles: ['']
})
export class ChartsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  // chart1
  student: any = [
    { data: [60, 45, 57, 49, 75], name: 'Akshay' },
    { data: [78, 76, 46, 82, 41], name: 'Sandeep' },
    { data: [70, 56, 76, 71, 34], name: 'Sai' },
    { data: [58, 36, 66, 32, 41], name: 'Bhanu' },
    { data: [48, 52, 86, 72, 51], name: 'Navatha' }
  ];

  student_category: string[] = ['DAA', 'C', 'C++', 'M1', 'M2'];

  // chart 2 toggling
  public showSeries: boolean = false;
  public toggleSeries() {
    this.showSeries = !this.showSeries;
  }

  // to save chart to png
  @ViewChild('export') private chart: ChartComponent | any;
  public exportChart(): void {
    this.chart
      .exportImage()
      .then((dataURI: any) => saveAs(dataURI, 'image.png'));
  }
}
