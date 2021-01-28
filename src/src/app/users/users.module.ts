import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../materials.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
