import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../materials.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";

import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';




@NgModule({
  declarations: [
    QuestionsListComponent,
    QuestionEditComponent,
    ManagerPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class QuestionsManagementModule { }
