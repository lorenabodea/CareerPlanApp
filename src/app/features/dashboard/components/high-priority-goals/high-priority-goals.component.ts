import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeLast } from 'rxjs/operators';
import { Goal, Task } from 'src/app/domain/goal.model';
import { DashboardActions } from '../../state/dashboard.actions';
import { DashboardSelectors } from '../../state/dashboard.selector';

@Component({
  selector: 'app-high-priority-goals',
  templateUrl: './high-priority-goals.component.html',
  styleUrls: ['./high-priority-goals.component.scss']
})
export class HighPriorityGoalsComponent implements OnInit {

  public goalsHighPiority$: Observable<Goal[]>;

  allComplete: boolean = false;

  constructor(
    private readonly store: Store,
  ) {
    this.goalsHighPiority$ = this.store.select(DashboardSelectors.getGoalsOverdue);
  }

  ngOnInit(): void {
    this.goalsHighPiority$.subscribe(data => console.log(data))
  }

  setAll(completed: boolean, goal: Goal) {
    this.allComplete = completed;
    //   if (this.task.subtasks == null) {
    //     return;
    //   }
    //   this.task.subtasks.forEach(t => t.completed = completed);
  }

  public changeTask(completed: boolean, goal2: Goal, task: Task): void {
    let taskIndex = goal2.tasks.findIndex(item => item.id === task.id);
    let taskFound = goal2.tasks[taskIndex];
    //taskFound.done = completed;
    let goal: Goal = {...goal2};

    let task2: Task = {
      id: task.id,
      description: task.description,
      done: completed,
      goalId: task.goalId,
      effort: task.effort,
      recurringType: task.recurringType,
      duedate: task.duedate
    }

    
    
    // goal.tasks.forEach(item => {
    //   if(item.id === task.id)
    //   item = task2;
    // })

    this.store.dispatch(DashboardActions.updateGoal({ goal }))
  }

}
