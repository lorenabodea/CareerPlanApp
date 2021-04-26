import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Goal } from 'src/app/domain/goal.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public activeGoalComment$: Observable<Goal>;
  private activeGoalCommentSubject = new BehaviorSubject<Goal>(null);

  constructor() {
    this.activeGoalComment$ = this.activeGoalCommentSubject.pipe();
  }

  public changeActiveGoal(goal: Goal): void {
    this.activeGoalCommentSubject.next(goal);
  }
}
