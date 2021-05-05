import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Goal } from 'src/app/domain/goal.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public activeGoalComment$: Observable<Goal>;
  private activeGoalCommentSubject = new BehaviorSubject<Goal>(null);

  public hasBackdrop$: Observable<boolean>;
  private hasBackdropSubject = new BehaviorSubject<boolean>(true);


  constructor() {
    this.activeGoalComment$ = this.activeGoalCommentSubject.pipe();
    this.hasBackdrop$ = this.hasBackdropSubject.pipe()
  }

  public nextBackdrop(value: boolean): void {
    this.hasBackdropSubject.next(value);
  }


  public changeActiveGoal(goal: Goal): void {
    this.activeGoalCommentSubject.next(goal);
  }
}
