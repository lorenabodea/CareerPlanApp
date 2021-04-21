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
                console.log('here')
                console.log(goals);
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