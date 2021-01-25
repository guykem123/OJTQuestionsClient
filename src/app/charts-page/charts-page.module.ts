import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [ChartsViewComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChartsPageModule { }
