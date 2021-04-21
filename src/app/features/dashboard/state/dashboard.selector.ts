import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "./dashboard.state";

export const featureKey = 'dashboard';
export const selectFeature = createFeatureSelector<DashboardState>(featureKey);

export class DashboardSelectors {
    public static getGoals = createSelector (
        selectFeature,
        (state: DashboardState) => state.goals.list
    )

    public static getGoalsOverdue = createSelector (
        selectFeature,
        (state: DashboardState) => state.goals.overdue
    )

    public static getGoalsthisMonth = createSelector (
        selectFeature,
        (state: DashboardState) => state.goals.thisMonth
    )
    
    public static counter = createSelector(
        selectFeature,
        (state: DashboardState) => state.counter
    );
    public static users = createSelector(
        selectFeature,
        (state: DashboardState) => state.users
    )
}
