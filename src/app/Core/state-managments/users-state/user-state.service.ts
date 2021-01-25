import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/Models/user.model';
import { UsersModule } from 'src/app/users/users.module';
import { AuthService } from '../../authentication/http/auth.service';
import { LocalStorageService } from '../../storages/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private sharedUserName = new BehaviorSubject<string>('');
  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService) {
    const isLoggedIn = JSON.parse(this.localStorageService.getItem('isLogged'));
    if (isLoggedIn === true) {
      const LoggedInUser = JSON.parse(this.localStorageService.getItem('currentUser'));
      this.mapUserLoggedIn(LoggedInUser);
    }

  }
  userLoggingOut(user: UserModel) {
    if (this.handleisLoggedin(false) && !this.handleCurrentuser()) {
      this.mapUserLoggedIn();
    }
  }
  userLoggingIn(user: UserModel) {
    if (this.handleisLoggedin(true) && this.handleCurrentuser(JSON.stringify(user))) {
      this.mapUserLoggedIn(user);
    }
  }

  mapUserLoggedIn(user?: UserModel) {
    if (!user || !user.username || user.username.trim() === '') {
      this.sharedUserName.next('');
      return;
    }
    this.sharedUserName.next(user.username);
  }

  public retrieveMappedLoggedInUserNameState(): Observable<string> {
    return this.sharedUserName.asObservable();
  }

  private setSession(authResult) {
    this.localStorageService.setItem('id_token', authResult.idToken);
  }


  private handleCurrentuser(value?): boolean {
    if (value) {
      this.localStorageService.setItem('currentUser', value);
      return true;
    }
    else {
      this.localStorageService.removeItem('currentUser');
      return false;
    }
    //localStorage.getItem()
  }
  private handleisLoggedin(value?): boolean {
    return this.localStorageService.setItem('isLogged', value);
    //localStorage.getItem()
  }
}
