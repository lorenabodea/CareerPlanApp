import { Component, ComponentFactoryResolver, Directive, Inject, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChildboxComponent } from 'src/app/common/comment/childbox/childbox.component';
import { Comment, Goal, ReplyComment } from 'src/app/domain/goal.model';
import { CommentService } from '../../services/service/comment.service';
import { DashboardActions } from '../../state/dashboard.actions';

@Directive({
  selector: '[datacontainer]',
})
export class DatacontainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comment-doalog',
  templateUrl: './comment-doalog.component.html',
  styleUrls: ['./comment-doalog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  commentForm: FormGroup;
  submitted: Boolean = false;

  public reply: Array<object> = [];


  public loadComponent = false;


  public currentGoal$: Observable<Goal>;
  public postComments: Comment[];
  public currentGoal: Goal;
  public currentgoalId: number;
  @ViewChildren(DatacontainerDirective) entry: QueryList<DatacontainerDirective>;


  constructor(
    private readonly store: Store,
    private formBuilder: FormBuilder,
    private readonly commentServie: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resolver: ComponentFactoryResolver,
    private readonly dialogRef: MatDialogRef<CommentDialogComponent>,
    public dialog: MatDialog
  ) {
    this.currentGoal$ = this.commentServie.activeGoalComment$.pipe();
    this.currentGoal$.subscribe((data) => {
      this.postComments = data.comments;
      this.currentGoal = data;
    })
  }

  ngOnInit() {
    this.createForm();

    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = { left: `${this.data.position.left}px`, top: `${this.data.position.top - 1}px` };
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.commentForm.invalid) {
      return false;
    } else {

      let comment: Comment = {
        id: 0,
        commentText: this.commentForm.controls['comment'].value,
        commenterId: -1,
        goalId: this.currentGoal.id,
        currentDate: new Date().toDateString(),
        resolved: false,
        replyComments: []
      };

      this.store.dispatch(DashboardActions.createComment({ comment }));

      let newgoal: Goal = {
        id: this.currentGoal.id,
        title: this.currentGoal.title,
        tasks: this.currentGoal.tasks,
        done: this.currentGoal.done,
        comments: [...this.currentGoal.comments, comment],
        careerPlanId: this.currentGoal.careerPlanId,
        userId: this.currentGoal.userId
      }

      this.commentServie.changeActiveGoal(newgoal);
    }
  }


  replyComment(index, commentId) {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(ChildboxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
        data => {
          this.receiveReplyComment(data, index);

          var replyComment: ReplyComment = {
            id: 0,
            commenterId: -1,
            currentDate: data[0]['currentDate'],
            commentText: data[0]['commentTxt'],
            commentId: commentId
          }

          this.store.dispatch(DashboardActions.createReplyComment({ replyComment }));

          var comments: Comment[] = [];
          this.currentGoal.comments.forEach(item => {
            if (item.id === commentId) {
              var repls = [...item.replyComments, replyComment]
              var comment: Comment = {
                id: item.id,
                commentText: item.commentText,
                commenterId: item.commenterId,
                goalId: item.goalId,
                currentDate: item.currentDate,
                resolved: item.resolved,
                replyComments: repls
              }
              comments.push(comment)
            } else {
              comments.push(item)
            }
          })
          let newgoal: Goal = {
            id: this.currentGoal.id,
            title: this.currentGoal.title,
            tasks: this.currentGoal.tasks,
            done: this.currentGoal.done,
            comments: comments,
            careerPlanId: this.currentGoal.careerPlanId,
            userId: this.currentGoal.userId
          }

          this.commentServie.changeActiveGoal(newgoal);

        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }
  }
  receiveReplyComment($event, i) {
    this.reply = $event;

    this.loadComponent = false;
  }

  removeComment(commentId: number): void {
    this.store.dispatch(DashboardActions.deleteComment({ commentId }));

    let comments: Comment[] = [];

    this.currentGoal.comments.forEach(item => {
      if (item.id !== commentId) {
        comments.push(item)
      }
    })

    let newgoal: Goal = {
      id: this.currentGoal.id,
      title: this.currentGoal.title,
      tasks: this.currentGoal.tasks,
      done: this.currentGoal.done,
      comments: comments,
      careerPlanId: this.currentGoal.careerPlanId,
      userId: this.currentGoal.userId
    }

    this.commentServie.changeActiveGoal(newgoal);
  }

}
