import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Console } from 'console';
import { error } from 'protractor';
import { queue } from 'rxjs/internal/scheduler/queue';
import { QuestionModel } from 'src/app/Models/question.model';
import { SnackbarService } from 'src/app/Core/popup-messages/snackbar/snackbar.service';
import { QuestionsService } from '../Services/questions.service';
import { MatPaginator } from '@angular/material/paginator';
import { QuestionsStateService } from 'src/app/Core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnChanges {

  @Input() qTableData: QuestionModel[];

  @Output() onQuestionActions: EventEmitter<QuestionModel> = new EventEmitter();

  dataSource = new MatTableDataSource<QuestionModel>();
  columnsToDisplay: string[] = ['id', 'name', 'creationDate', 'edit-btns'];

  selectedColumn: string;
  sortingColumns = [{ key: "name", title: 'Name' }, { key: "creationDate", title: 'Creation Date' }];

  /**While using @viewChild we are basically declaring a reference
  * to a son element that is inside the current component, 
  *can not give it a string and then it will look for the selector or object a
  *nyway Angular will look for the first match and I will win. */
  @ViewChild(MatSort) sort: MatSort;
  /**
   *In this case we want to search for viewChild of type MatSort 
   *when the event "getAllQuestions().Subscribe" invokes so we 
   *actually have access to the variable and we initialize the 
   *sort property of the dataSource of our table.
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private questionsService: QuestionsService,
    private questionsState: QuestionsStateService,
    public dialog: MatDialog,
    private snackbars: SnackbarService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.qTableData;
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.id.toLowerCase().includes(filter);
    };

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }
  openQuestionActions(question?: QuestionModel) {
    this.onQuestionActions.emit(question);
  }


  deleteQuestion(questionId: string) {
    const dialogRef = this.dialog.open(DialogElementsDialog,
      { data: { qId: questionId } });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.questionsService.deleteQuestion(questionId).subscribe(
            data => {
              this.dataSource.data = this.dataSource.data.filter(ques => ques.id !== questionId);
              this.snackbars.openSimpleTextSnackBar(data.message);
              this.questionsState.deleteQuestion(questionId);
            },
            error => alert(error)
          );
        }
      }
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches 
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortTableByKey(key: string) {
    this.dataSource.sort = this.sort;
    const sortState: Sort = { active: key, direction: 'asc' }; //Set the sort properties object
    this.dataSource.sort.active = sortState.active;//Set the single column that is active to sorting at the datasource
    this.dataSource.sort.direction = sortState.direction;//Set the direction of sorting in the datasource
    this.dataSource.sort.sortChange.emit(sortState);//Datasource Invoke the sorting operation
  }
}

@Component({
  selector: 'dialog-elements-dialog',
  template: `<h1 mat-dialog-title>Delete</h1>
  <div mat-dialog-content>Are you sure you to delete question {{data.qId}}?</div>
  <div mat-dialog-actions content="end">
  <button class="btn-dialog can" (click)="confirmDelete()" mat-dialog-close>Cancel</button>
  
  <button class="btn-dialog del" (click)="confirmDelete(true)" mat-dialog-close cdkFocusInitial>Yes</button>
</div>`,
  styleUrls: ['./questions-list.component.css']
})
export class DialogElementsDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogElementsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { qId: string }) { }

  confirmDelete(confirmDelete?: boolean) {
    this.dialogRef.close(confirmDelete);
  }
}
