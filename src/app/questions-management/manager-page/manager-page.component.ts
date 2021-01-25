import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { QuestionModel } from 'src/app/Models/question.model';
import { SnackbarService } from 'src/app/Core/popup-messages/snackbar/snackbar.service';
import { QuestionsService } from '../Services/questions.service';
import { QuestionsStateService } from 'src/app/Core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {

  canLeave: boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;
  reason: string;

  qList: QuestionModel[];

  actionedQuestionId: number;
  actionedQuestion: QuestionModel;
  constructor(private questionsState: QuestionsStateService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getAllQustions();
  }

  private getAllQustions() {
    return this.questionsState.retrieveMappedQuestionListState().subscribe(
      res => {
        this.qList = res;
      },
      error => this.snackbarService.openSimpleTextSnackBar(`An error occurred, please refresh the page: ${error['message']}`)
    );
  }

  getActionedQuestion(question: QuestionModel) {
    if (question) {
      this.actionedQuestion = question;
    }
    else {
      this.actionedQuestion = new QuestionModel();
    }
    this.sidenav.open();
  }


  getUpdatedQuestion(ques: QuestionModel) {
    try {
      if (ques) {
        this.sidenav.close();       
        this.questionsState.updateQuestion(ques);
      }
    } catch (err) {
      console.log(`An error occurred: ${err['message']}`);
    }
  }

  getNewQuestion(ques: QuestionModel) {
    if (ques) {
      this.qList = [...this.qList, ques];
      this.questionsState.addQuestion(ques);
      this.sidenav.close();
    }
  }


  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}

