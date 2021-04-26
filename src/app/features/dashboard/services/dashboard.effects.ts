import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { Goal } from "src/app/domain/goal.model";
import { DashboardActions } from "../state/dashboard.actions";
import { GoalService } from "./goal/goal-service";

const errorHandlerPipe = (message: string) => {
    return (details: any) => of(DashboardActions.throwError({ message, details }));
};

@Injectable()
export class DashboardEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly goalService: GoalService) { }

    public getGoals$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.getGoals),
        mergeMap((_action) => this.goalService.getGoals().pipe(
            map((goals: Goal[]) => {
                return DashboardActions.getGoalsSuccess({ goals })
            }
            ),
            catchError((error: Error) => {
                console.log(error)
                return errorHandlerPipe(error.message);
            })

        ))
    ));

    public updateGoal$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.updateGoal),
        concatMap((_action) => this.goalService.updateGoal(_action.goal).pipe(
            map(goal => DashboardActions.updateGoalSuccess({ goal })),
            catchError((error: Error) => {
                console.log(error)
                return errorHandlerPipe(error.message);
            })
        ))
    ))

    public createGoal$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.createGoal),
        concatMap((_action) => this.goalService.createGoal(_action.goal).pipe(
            map(goal => DashboardActions.createGoalSuccess({ goal })),
            catchError((error: Error) => {
                console.log(error)
                return errorHandlerPipe(error.message);
            })
        ))
    ))

    public createComment$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.createComment),
        concatMap((_action) => this.goalService.createComment(_action.comment).pipe(
            map(goal => DashboardActions.createCommentSuccess({ goal })),
            catchError((error: Error) => {
                console.log(error)
                return errorHandlerPipe(error.message);
            })
        ))
    ))

    public createReplyComment$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.createReplyComment),
        concatMap((_action) => this.goalService.createReplyComment(_action.replyComment).pipe(
            map(goal => DashboardActions.createCommentSuccess({ goal })),
            catchError((error: Error) => {
                console.log(error)
                return errorHandlerPipe(error.message);
            })
        ))
    ))

    public deleteComment$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.deleteComment),
        concatMap((_action) => this.goalService.deleteComment(_action.commentId).pipe(
            map(commentId => DashboardActions.deleteCommentSuccess({ commentId })),
            catchError((error: Error) => {
                console.log(error)
                return errorHandlerPipe(error.message);
            })
        ))
    ))



    // public getUsers$ = createEffect(() => this.actions$.pipe(
    //     ofType(DashboardActions.getUsers),
    //     mergeMap((action) => this.http.get(this.ApiURL).pipe(
    //         map((appUsers: AppUser[]) => {
    //             console.log('users: ')
    //             return DashboardActions.getUsersSuccess({ appUsers }
    //             )
    //         }),
    //         catchError((error: Error) => {
    //             console.log('error')
    //             return errorHandlerPipe(error.message);
    //         })
    //     ))
    // ))

}