import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Comment, Goal } from 'src/app/domain/goal.model';
import { DashboardActions } from 'src/app/features/dashboard/state/dashboard.actions';
import { DashboardSelectors } from 'src/app/features/dashboard/state/dashboard.selector';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() commentsArray: Comment[];

  comments: string;
  count: number;

  constructor(private readonly store: Store) { }

  ngOnInit() {
    this.count = 0;
    console.log(this.commentsArray);
  }

  receiveComment($event) {
    // let comment: Comment = {
    //   id: 
    // }
    //this.commentsArray.push({});
    this.count = this.commentsArray.length;

    // let currentGoal$ = this.store.select(DashboardSelectors.currentGoalComment);
    // let currentgoalId;
    // currentGoal$.subscribe((value) => {
    //   currentgoalId = value.id;
    // })

    // let lastComment = this.comments[this.comments.length - 1];

    // let comment: Comment = {
    //   id: 0,
    //   commentText: lastComment['commentTxt'],
    //   commenterId: -1,
    //   goalId: currentgoalId,
    //   currentDate: new Date().toDateString(),
    //   resolved: false,
    //   replyComments: []
    // };

    // currentGoal$.pipe(
    //   map((goal) => {

    //     let newgoal: Goal = {
    //       id: goal.id,
    //       title: goal.title,
    //       tasks: goal.tasks,
    //       done: goal.done,
    //       comments: [...goal.comments, comment]
    //     }

    //     return newgoal;
    //   })
    // ).subscribe((result) =>
    //   this.commentsArray = result.comments
    // );


    // this.store.dispatch(DashboardActions.createComment({ comment }))

  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
