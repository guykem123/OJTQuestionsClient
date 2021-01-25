import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './materials.module';
import { CommonModule } from '@angular/common';
import { CoreModule } from "./Core/core.module";
import { HttpClientModule } from '@angular/common/http'
import { QuestionsManagementModule } from './questions-management/questions-management.module'
import { UsersModule } from './users/users.module';
import { ChartsPageModule } from "./charts-page/charts-page.module";
import { SharedModule } from "./shared/shared.module";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    CommonModule,
    HttpClientModule,
    QuestionsManagementModule,
    UsersModule,
    ChartsPageModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
