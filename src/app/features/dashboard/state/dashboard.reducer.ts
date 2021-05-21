import { createReducer, on } from "@ngrx/store";
import { DashboardActions } from "./dashboard.actions";
import { initialDashboardState, DashboardState } from './dashboard.state';
import { DateTime } from 'luxon';
import { Comment, Goal } from "src/app/domain/goal.model";

export const DashboardReducers = createReducer(
    initialDashboardState,
    on(
        DashboardActions.getGoalsSuccess, (state: DashboardState, { goals }) => ({
            ...state,
            goals: {
                ...state.goals,
                list: goals,
                overdue: goals.filter((goal) => goal.tasks.some(task => DateTime.fromISO(task.duedate) <= DateTime.now())),
                thisMonth: goals.filter((goal) => goal.tasks.some(task => DateTime.fromISO(task.duedate) > DateTime.now() 
                && DateTime.fromISO(task.duedate).month === DateTime.now().month)),
                history: goals.filter((goal) => goal.tasks.some(task => DateTime.fromISO(task.done) === true)),
            },
        })
    ),
    on(
        DashboardActions.updateGoalSuccess, (state: DashboardState, { goal }) => {
            const updatedGoals = state.goals.list.map((item => item.id === goal.id ? goal : item))
            return {
                ...state,
                goals: {
                    ...state.goals,
                    list: updatedGoals
                },
            }
        }
    ),
    on(
        DashboardActions.createCommentSuccess, (state: DashboardState, { goal }) => {
            const updatedGoals = state.goals.list.map((item => item.id === goal.id ? goal : item))

            return {
                ...state,
                goals: {
                    ...state.goals,
                    list: updatedGoals
                },
            }
        }
    ),
    on(
        DashboardActions.deleteCommentSuccess, (state: DashboardState, { commentId }) => {
            const updatedGoals = state.goals.list.map(item => {
                let comments: Comment[] = [];

                item.comments.forEach(comment => {
                    if (commentId !== comment.id) {
                        comments.push(comment)
                    }
                })

                let goal: Goal = {
                    id: item.id,
                    title: item.title,
                    tasks: item.tasks,
                    comments: comments,
                    done: item.done,
                    careerPlanId: item.careerPlanId
                }

                return goal;
            })

            return {
                ...state,
                goals: {
                    ...state.goals,
                    list: updatedGoals
                },
            }
        }
    ),

    on(
        DashboardActions.createReplyCommentSuccess, (state: DashboardState, { replyComment }) => {
            const updatedGoals = state.goals.list.map(item => {
                item.comments.forEach(comment => {
                    if (comment.id === replyComment.commentId) {
                        comment.replyComments = [...comment.replyComments, replyComment]
                    }
                })

                return item;
            })

            return {
                ...state,
                goals: {
                    ...state.goals,
                    list: updatedGoals
                },
            }
        }
    ),
    on(
        DashboardActions.createGoalSuccess, (state: DashboardState, { goal }) => {
            return {
                ...state,
                goals: {
                    ...state.goals,
                    list: [...state.goals.list, goal]
                },
            }
        }
    ),
    on(
        DashboardActions.currentGoalComment,
        (state: DashboardState, { currentGoalComment }) => ({
            ...state,
            currentGoalComment: currentGoalComment,
        }),
    ),

)