import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Comment, Goal } from 'src/app/domain/goal.model';
import { DashboardActions } from 'src/app/features/dashboard/state/dashboard.actions';
import { DashboardSelectors } from 'src/app/features/dashboard/state/dashboard.selector';
import { DashboardState } from 'src/app/features/dashboard/state/dashboard.state';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.scss']
})
export class CommentboxComponent implements OnInit {

  commentForm: FormGroup;
  commentsArray: Comment[] = [];
  submitted: Boolean = false;
  public id = 0;
  @Output() usercomment = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private readonly store: Store) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return false;
    } else {
      // this.commentsArray.push({
      //   commentId: this.id++,
      //   currentDate: new Date(),
      //   commentTxt: this.commentForm.controls['comment'].value,
      //   replyComment: []
      // });

      let currentGoal$ = this.store.select(DashboardSelectors.currentGoalComment);
      let currentgoalId;
      currentGoal$.subscribe((value) => {
        currentgoalId = value.id;
      })

      let comment: Comment = {
        id: 0,
        commentText: this.commentForm.controls['comment'].value,
        commenterId: -1,
        goalId: currentgoalId,
        currentDate: new Date().toDateString(),
        resolved: false,
        replyComments: []
      };

      this.store.dispatch(DashboardActions.createComment({ comment }))

      this.commentsArray.push(comment);
      this.usercomment.emit(this.commentsArray);

      currentGoal$.pipe(
        map((goal) => {

          let newgoal: Goal = {
            id: goal.id,
            title: goal.title,
            tasks: goal.tasks,
            done: goal.done,
            comments: [...goal.comments, comment],
            careerPlanId: goal.careerPlanId
          }

          return newgoal;
        })
      ).subscribe((result) =>
        this.commentsArray = result.comments
      );
    }
  }


}