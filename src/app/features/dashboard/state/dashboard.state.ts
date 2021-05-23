import { Goal } from "src/app/domain/goal.model";

export interface AppUser {
    id: number;
    userName: string;
}

export interface DashboardState {
    goals: {
        list: Goal[];
        overdue: Goal[];
        weekly: Goal[];
        next: Goal[];
        thisMonth: Goal[];
        history: Goal[];
        today: Goal[];
    },
    currentGoalComment: Goal,
}

export const initialDashboardState: DashboardState = {

    goals: {
        today: [],
        list: [],
        overdue: [],
        weekly: [],
        next: [],
        thisMonth: [],
        history: []
    },
    currentGoalComment: null,
}