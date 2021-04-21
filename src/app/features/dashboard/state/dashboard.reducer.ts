import { createReducer, on } from "@ngrx/store";
import { DashboardActions } from "./dashboard.actions";
import { initialDashboardState, DashboardState } from './dashboard.state';
import { DateTime } from 'luxon';

export const DashboardReducers = createReducer(
    initialDashboardState,
    on(
        DashboardActions.getGoalsSuccess, (state: DashboardState, { goals }) => ({
            ...state,
            goals: {
                ...state.goals,
                list: goals,
                overdue: goals.filter((goal) => goal.tasks.some(task => DateTime.fromISO(task.duedate) <= DateTime.now())),
                thisMonth: goals.filter((goal) => goal.tasks.some(task => DateTime.fromISO(task.duedate) > DateTime.now() && DateTime.fromISO(task.duedate).month === DateTime.now().month)),
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
        DashboardActions.increase,
        (state: DashboardState, { counter }) => ({
            ...state,
            counter: state.counter + counter,
        }),
    ),
    on(
        DashboardActions.decrease,
        (state: DashboardState, { counter }) => ({
            ...state,
            counter: state.counter - counter,
        }),
    ),
    on(
        DashboardActions.getUsersSuccess,
        (state: DashboardState, { appUsers }) => ({
            ...state,
            users: appUsers
        })
    ),


)