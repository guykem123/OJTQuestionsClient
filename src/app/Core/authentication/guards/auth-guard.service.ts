
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagerPageComponent } from 'src/app/questions-management/manager-page/manager-page.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate, CanDeactivate<ManagerPageComponent> {

  constructor() { }
  canDeactivate(component: ManagerPageComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  //TODO- start the authentication with JWT
}
