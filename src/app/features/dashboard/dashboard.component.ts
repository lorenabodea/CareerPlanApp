import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Goal, Task } from 'src/app/domain/goal.model';
import { DashboardActions } from './state/dashboard.actions';
import { DashboardSelectors } from './state/dashboard.selector';
import { DateTime } from 'luxon';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from './components/comment-doalog/comment-doalog.component';
import { CommentService } from './services/service/comment.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public goals$: Observable<Goal[]>;

  public goalsHighPiority$: Observable<Goal[]>;
  public goalsMonth$: Observable<Goal[]>;
  public goalsHistory$: Observable<Goal[]>;

  constructor(
    private readonly store: Store,
    public dialog: MatDialog,
    private readonly commentService: CommentService
  ) {

    this.store.dispatch(DashboardActions.getGoals());

    this.goals$ = this.store.select(DashboardSelectors.getGoals);

    this.goalsHighPiority$ = this.goals$.pipe(
      map((goals) => goals.filter((goal) => goal.tasks.some(task => DateTime.fromISO(task.duedate) <= DateTime.now())))
    );

    this.goalsMonth$ = this.goals$.pipe(
      map((goals) => goals.filter((goal) => goal.tasks.some(task => DateTime.fromISO(task.duedate) > DateTime.now() && DateTime.fromISO(task.duedate).month === DateTime.now().month)))
    );

    this.goalsHistory$ = this.goals$.pipe(
      map((goals) => goals.filter((goal) => goal.tasks.some(task => task.done === true)))
    );
  }

  ngOnInit(): void {
  }

  public changeTask(goalFromTemplate: Goal, task: Task): void {
    let tasks: Task[] = [];

    goalFromTemplate.tasks.forEach(element => {
      if (element.id === task.id) {
        let newTask: Task = {
          id: task.id,
          description: task.description,
          effort: task.effort,
          duedate: task.duedate,
          done: !task.done,
          recurringType: task.recurringType,
          goalId: task.goalId
        }
        tasks.push(newTask);
      } else {
        tasks.push(element);
      }
    });

    let newDone = !goalFromTemplate.tasks.some(item => item.done === true)

    let goal: Goal = {
      id: goalFromTemplate.id,
      title: goalFromTemplate.title,
      tasks: tasks,
      done: newDone,
      comments: goalFromTemplate.comments
    }

    this.store.dispatch(DashboardActions.updateGoal({ goal }))
  }

  public changeGoal(goalFromTemplate: Goal): void {
    let tasks: Task[] = [];

    goalFromTemplate.tasks.forEach(element => {

      let newTask: Task = {
        id: element.id,
        description: element.description,
        effort: element.effort,
        duedate: element.duedate,
        done: !goalFromTemplate.done,
        recurringType: element.recurringType,
        goalId: element.goalId
      }
      tasks.push(newTask);

    });

    let newDone = !goalFromTemplate.done;

    let goal: Goal = {
      id: goalFromTemplate.id,
      title: goalFromTemplate.title,
      tasks: tasks,
      done: newDone,
      comments: goalFromTemplate.comments
    }

    this.store.dispatch(DashboardActions.updateGoal({ goal }))
  }

  public changecurrentGoalcomponent(currentGoalComment: Goal, event) {
    this.store.dispatch(DashboardActions.currentGoalComment({ currentGoalComment }));

    this.commentService.changeActiveGoal(currentGoalComment);
    this.dialog.open(CommentDialogComponent, {
      data: {
        position: {
          top: event.clientY,
          left: event.clientX
        }
      },
    });
  }
}