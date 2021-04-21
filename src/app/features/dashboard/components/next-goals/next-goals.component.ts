import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Goal } from 'src/app/domain/goal.model';
import { DashboardSelectors } from '../../state/dashboard.selector';

@Component({
  selector: 'app-next-goals',
  templateUrl: './next-goals.component.html',
  styleUrls: ['./next-goals.component.scss']
})
export class NextGoalsComponent implements OnInit {

  public goalsHistory$: Observable<Goal[]>;
  allComplete: boolean = false;

  constructor(
    private readonly store: Store,
  ) {
    this.goalsHistory$ = this.store.select(DashboardSelectors.getGoalsthisMonth);

   }

  ngOnInit(): void {
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  }

}
