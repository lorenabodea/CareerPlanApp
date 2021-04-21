import { User } from "@auth0/auth0-spa-js";
import { createAction, props } from "@ngrx/store";
import { Goal, Task } from "src/app/domain/goal.model";
import { AppUser } from "./dashboard.state";

export enum DasboardActionTypes {
    // Goals
    GetGoals = '[Goals] Get goals',
    GetGoalsSuccess = '[Goals] Get goals (success)',

    UpdateGoal = '[Goals] Update goals',
    UpdateGoalSuccess = '[Goals] Update goals success',
    UpdateGoalFailure = '[Goals] Update goals failure',

    UpdateTask = '[Tasks] Update tasks',
    UpdateTaskSuccess = '[Tasks] Update tasks success',
    UpdateTaskFailure = '[Tasks] Update tasks failure',

    Increase = 'Increase',
    Decrease = 'Decrease',
    SubmitIssue = '[Task] submit',
    GetUsers = '[Users] get',
    GetUsersSuccess = '[Users] get success',
    Error = '[Users] - Error',
}

export class DashboardActions {
    public static getGoals = createAction(DasboardActionTypes.GetGoals);

    public static getGoalsSuccess = createAction(
        DasboardActionTypes.GetGoalsSuccess,
        props<{ goals: Goal[] }>(),
    );

    public static updateGoal = createAction(
        DasboardActionTypes.UpdateGoal,
        props<{ goal: Goal }>()
    );

    public static updateGoalSuccess = createAction(
        DasboardActionTypes.UpdateGoalSuccess,
        props<{ goal: Goal }>()
    );

    public static updateGoalFailure = createAction(
        DasboardActionTypes.UpdateGoalFailure,
        props<{ error: string }>()
    );

    public static updateTask = createAction(
        DasboardActionTypes.UpdateTask,
        props<{ task: Task }>()
    );

    public static updateTaskSuccess = createAction(
        DasboardActionTypes.UpdateTaskSuccess,
        props<{ task: Task }>()
    );

    public static updateTaskFailure = createAction(
        DasboardActionTypes.UpdateTaskFailure,
        props<{ error: string }>()
    );

    public static increase = createAction(
        DasboardActionTypes.Increase,
        props<{ counter: number }>()
    );
    public static decrease = createAction(
        DasboardActionTypes.Decrease,
        props<{ counter: number }>()
    );

    public static getUsers = createAction(
        DasboardActionTypes.GetUsers,
    );

    public static getUsersSuccess = createAction(
        DasboardActionTypes.GetUsersSuccess,
        props<{ appUsers: AppUser[] }>()
    );
    public static throwError = createAction(
        DasboardActionTypes.Error,
        props<{ message: string; details?: any }>()
    );
}
