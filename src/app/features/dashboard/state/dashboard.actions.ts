import { User } from "@auth0/auth0-spa-js";
import { createAction, props } from "@ngrx/store";
import { Comment, Goal, ReplyComment, Task } from "src/app/domain/goal.model";
import { AppUser } from "./dashboard.state";

export enum DasboardActionTypes {
    // Goals
    GetGoals = '[Goals] Get goals',
    GetGoalsSuccess = '[Goals] Get goals (success)',

    UpdateGoal = '[Goals] Update goals',
    UpdateGoalSuccess = '[Goals] Update goals success',
    UpdateGoalFailure = '[Goals] Update goals failure',

    CreateGoal = '[Goals] Create goals',
    CreateGoalSuccess = '[Goals] Create goals success',
    CreateGoalFailure = '[Goals] Create goals failure',

    CreateComment = '[Comments] Create Comment',
    CreateCommentSuccess = '[Comment] Create comment success',
    CreateCommentFailure = '[Comment] Create comment failure',

    DeleteComment = '[Comments] Delete Comment',
    DeleteCommentSuccess = '[Comment] Delete comment success',
    DeleteCommentFailure = '[Comment] Delete comment failure',


    CreateReplyComment = '[Reply] Create Reply',
    CreateReplyCommentSuccess = '[Reply] Create Reply success',
    CreateReplyCommentFailure = '[Reply] Create Reply failure',


    UpdateTask = '[Tasks] Update tasks',
    UpdateTaskSuccess = '[Tasks] Update tasks success',
    UpdateTaskFailure = '[Tasks] Update tasks failure',

    CurrentGoalComment = '[Goal] Current goal comment',

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

    public static createGoal = createAction(
        DasboardActionTypes.CreateGoal,
        props<{ goal: Goal }>()
    );

    public static createGoalSuccess = createAction(
        DasboardActionTypes.CreateGoalSuccess,
        props<{ goal: Goal }>()
    );

    public static createGoalFailure = createAction(
        DasboardActionTypes.CreateGoalFailure,
        props<{ error: string }>()
    );

    public static createComment = createAction(
        DasboardActionTypes.CreateComment,
        props<{ comment: Comment }>()
    );

    public static createCommentSuccess = createAction(
        DasboardActionTypes.CreateCommentSuccess,
        props<{ goal: Goal }>()
    );

    public static createCommentFailure = createAction(
        DasboardActionTypes.CreateCommentFailure,
        props<{ error: string }>()
    );

    public static deleteComment = createAction(
        DasboardActionTypes.DeleteComment,
        props<{ commentId: number }>()
    );

    public static deleteCommentSuccess = createAction(
        DasboardActionTypes.DeleteCommentSuccess,
        props<{ commentId: number }>()
    );

    public static deleteCommentFailure = createAction(
        DasboardActionTypes.DeleteCommentFailure,
        props<{ error: string }>()
    );


    public static createReplyComment = createAction(
        DasboardActionTypes.CreateReplyComment,
        props<{ replyComment: ReplyComment }>()
    );

    public static createReplyCommentSuccess = createAction(
        DasboardActionTypes.CreateReplyCommentSuccess,
        props<{ replyComment: ReplyComment }>()
    );

    public static createReplyCommentFailure = createAction(
        DasboardActionTypes.CreateReplyCommentFailure,
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

    public static getUsers = createAction(
        DasboardActionTypes.GetUsers,
    );

    public static currentGoalComment = createAction(
        DasboardActionTypes.CurrentGoalComment,
        props<{ currentGoalComment: Goal }>()
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
