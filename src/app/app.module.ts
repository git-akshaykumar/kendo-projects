import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { TestingComponent } from './testing/testing.component';
import { UnitTesingService } from './services/unit-tesing.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ChartsComponent,
    TestingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    ButtonsModule,
    IconsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
  ],
  providers: [UnitTesingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
