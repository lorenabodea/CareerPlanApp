
import {
  Component, OnInit, Input, Output, OnChanges, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Comment, Goal, ReplyComment } from 'src/app/domain/goal.model';
import { DashboardActions } from 'src/app/features/dashboard/state/dashboard.actions';
import { DashboardSelectors } from 'src/app/features/dashboard/state/dashboard.selector';
import { ChildboxComponent } from '../childbox/childbox.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})
export class DatacontainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit, OnChanges {
  @Input() postComment: Comment[] = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  @ViewChildren(DatacontainerDirective) entry: QueryList<DatacontainerDirective>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private readonly store: Store
  ) { }

  ngOnInit() {
    console.log('de afisat');
    console.log(this.postComment)
  }


  ngOnChanges() {
    if (this.postComment !== undefined) {
      console.log('Main array====>', this.postComment);
    }
  }

  removeComment(no) {
    this.postComment.splice(no, 1);
    console.log('After remove array====>', this.postComment);
    this.countComments.emit(this.postComment);
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
          console.log('Piyali=>', data);
          this.receiveReplyComment(data, index);

          var replyComment: ReplyComment = {
            id: 0,
            commenterId: -1,
            currentDate: data[0]['currentDate'],
            commentText: data[0]['commentTxt'],
            commentId: commentId
          }

          // this.postComment.forEach((element) => {
          //   if (element.id === commentId) {
          //     element.replyComments.push(replyComment);
          //     console.log('Main array after reply comment=>', this.postComment);
          //   }
          // });
          this.store.dispatch(DashboardActions.createReplyComment({ replyComment }))

          let currentGoal$ = this.store.select(DashboardSelectors.currentGoalComment);



          // let comment: Comment = {
          //   id: 0,
          //   commentText: lastComment['commentTxt'],
          //   commenterId: -1,
          //   goalId: currentgoalId,
          //   currentDate: new Date().toDateString(),
          //   resolved: false,
          //   replyComments: []
          // };
          ``
          // currentGoal$.pipe(
          //   map((goal) => {

          //     let comments = goal.comments;

          //     comments.forEach((comment) => {

          //     })
          //     let newgoal: Goal = {
          //       id: goal.id,
          //       title: goal.title,
          //       tasks: goal.tasks,
          //       done: goal.done,
          //       comments:
          //     }

          //     return newgoal;
          //   })
          // ).subscribe((result) =>
          //   this.commentsArray = result.comments
          // );




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


}
