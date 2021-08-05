import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { TestingComponent } from './testing/testing.component';

const routes: Routes = [
  {
    path: 'charts',
    component: ChartsComponent,
  },
  {
    path: 'test',
    component: TestingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
