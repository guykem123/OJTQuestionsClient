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

  currentLoggedInUser: UserModel;
  private sharedUserName = new BehaviorSubject<UserModel>(new UserModel);

  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService) {
    const isLoggedIn = JSON.parse(this.localStorageService.getItem('isLogged'));
    if (isLoggedIn === true) {
      const LoggedInUser = JSON.parse(this.localStorageService.getItem('currentUser'));
      this.mapUserLogged(LoggedInUser);
    }
  }
  
  mapUserLogged(user?: UserModel) {
    this.sharedUserName.next(user);
  }

  public retrieveMappedLoggedInUserNameState(): Observable<UserModel> {
    return this.sharedUserName.asObservable();
  }

  currentUserLoggingOut() {
    if (this.handleIsLoggedin(false) && this.localStorageService.removeItem('currentUser')) {
      this.mapUserLogged();
    }
  }

  userLoggingIn(user) {
    if (this.handleIsLoggedin(true) && this.localStorageService.setItem('currentUser', JSON.stringify(user))) {
      this.mapUserLogged(user);
    }
  }

  private handleIsLoggedin(value?): boolean {
    return this.localStorageService.setItem('isLogged', value);
  }
}
