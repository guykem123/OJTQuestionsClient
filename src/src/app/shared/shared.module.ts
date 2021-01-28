import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from "./charts/charts.module";


@NgModule({
  exports:[ChartsModule],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
