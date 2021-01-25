import { Component } from '@angular/core';
import { UserStateService } from './Core/state-managments/users-state/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuestionsClient';

  loggedName: string;
  constructor(private userState: UserStateService) {
    this.loggedName = '';
    this.getLoggedName();
  }

  getLoggedName() {
    this.userState.retrieveMappedLoggedInUserNameState()
      .subscribe(res => this.loggedName = res)
  }
}
