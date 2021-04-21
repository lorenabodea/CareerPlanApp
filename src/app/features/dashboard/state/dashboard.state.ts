import { Goal } from "src/app/domain/goal.model";

export interface AppUser {
    id: number;
    userName: string;
}


export interface Filter {
    text: string;
}

export interface DashboardState {
    goals: {
        list: Goal[];
        overdue: Goal[];
        weekly: Goal[];
        next: Goal[];
        thisMonth: Goal[];
        history: Goal[];
    },
    counter: number;
    selected: string[];
    filter: Filter;
    users: AppUser[];
    error: Error
}

export const initialDashboardState: DashboardState = {
    
   goals: {
       list: [],
       overdue: [],
       weekly: [],
       next: [],
       thisMonth: [],
       history: []
   },
    
    counter: 0,
    filter: {
        text: ''
    },
    selected: [],
    users: [{
        id: -1,
        userName: ''
    }],
    error: null
}