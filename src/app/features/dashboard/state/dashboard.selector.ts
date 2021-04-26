import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "./dashboard.state";

export const featureKey = 'dashboard';
export const selectFeature = createFeatureSelector<DashboardState>(featureKey);

export class DashboardSelectors {
    public static getGoals = createSelector(
        selectFeature,
        (state: DashboardState) => state.goals.list
    )

    public static currentGoalComment = createSelector(
        selectFeature,
        (state: DashboardState) => state.currentGoalComment
    )
}
