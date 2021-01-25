import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsViewComponent } from './charts-page/charts-view/charts-view.component';
import { ManagerPageComponent } from './questions-management/manager-page/manager-page.component';
import { LoginComponent } from './users/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'manager', component: ManagerPageComponent, },
  { path: 'charts', component: ChartsViewComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
